// Google Apps Script for Assessment 2 Data Collection + MailerLite Integration
//
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Copy and paste this entire script
// 4. Add your MailerLite API key in the script below (line 20)
// 5. Add your MailerLite Group ID in the script below (line 21)
// 6. Click "Deploy" > "New deployment" > "Web app"
// 7. Set "Execute as" to "Me"
// 8. Set "Who has access" to "Anyone"
// 9. Click "Deploy" and copy the URL
// 10. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' in assessment2.js with this URL

// ===== CONFIGURATION - ADD YOUR KEYS HERE =====
const MAILERLITE_API_KEY = 'YOUR_MAILERLITE_API_KEY'; // Get from MailerLite dashboard

// Map each band to its specific MailerLite group ID
const MAILERLITE_GROUP_IDS = {
  'rebuilding': '168664844845712861',
  'seeking': '168664816220636271',
  'growing': '168664777860581334',
  'thriving': '168664732998305428'
};
// ===============================================

function doPost(e) {
  try {
    // Log incoming request for debugging
    Logger.log('Received POST request');
    Logger.log('Request data: ' + e.postData.contents);

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed data successfully');

    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    Logger.log('Got sheet: ' + sheet.getName());

    // Parse responses and text responses
    const readableResponses = data.readableResponses || [];
    const textResponses = data.textResponses || {};

    // Just the answer text in each cell
    const responseTexts = [];
    for (let i = 0; i < 19; i++) {
      if (textResponses[i]) {
        // Text response question - full text
        responseTexts.push(textResponses[i]);
      } else if (readableResponses[i]) {
        // Multiple choice - full answer text
        responseTexts.push(readableResponses[i]);
      } else {
        responseTexts.push('');
      }
    }

    // Prepare the row data with expanded responses
    const row = [
      data.timestamp,
      data.email,
      data.name || '',
      data.band,
      data.scores ? data.scores.somatic : 0,
      data.scores ? data.scores.alignment : 0,
      data.scores ? data.scores.readiness : 0,
      data.scores ? data.scores.confidence : 0,
      ...responseTexts
    ];

    // Append the row
    sheet.appendRow(row);
    Logger.log('Row appended successfully');

    // Send to MailerLite
    const mailerliteResult = sendToMailerLite(data.email, data.name, data.band);
    Logger.log('MailerLite result: ' + mailerliteResult);

    // Return success with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved',
        mailerlite: mailerliteResult
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log detailed error
    Logger.log('Error occurred: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests for testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is running. Use POST to send data.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Assessment Responses');

  // If sheet doesn't exist, create it with headers
  if (!sheet) {
    sheet = ss.insertSheet('Assessment Responses');

    // Add headers - short descriptive labels
    const headers = [
      'Timestamp',
      'Email',
      'Name',
      'Band',
      'Somatic Score',
      'Alignment Score',
      'Readiness Score',
      'Confidence Score',
      'Morning feeling',
      'Rest patterns',
      'Body awareness',
      'Work-life boundaries',
      'Burnout response',
      'Support level',
      'Work feels like',
      'Achievement feels',
      'Career color',
      'Confidence in rooms',
      'Current state',
      'Dream space',
      'Work aligned vision',
      'Current situation',
      '90-day desire',
      'Biggest obstacles',
      'What already tried',
      'Support type needed',
      'Additional notes'
    ];

    sheet.appendRow(headers);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#C3A059');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setWrap(true);

    // Freeze header row
    sheet.setFrozenRows(1);

    // Set column widths for better readability
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 200); // Email
    sheet.setColumnWidth(3, 120); // Name
    sheet.setColumnWidth(4, 100); // Band

    // Score columns
    for (let i = 5; i <= 8; i++) {
      sheet.setColumnWidth(i, 100);
    }

    // Question columns
    for (let i = 9; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 250);
    }
  }

  return sheet;
}

// Send to MailerLite API
function sendToMailerLite(email, name, band) {
  try {
    // Map band to readable label
    const bandLabels = {
      'thriving': 'Thriving & Expanding',
      'growing': 'Growing with Room to Soar',
      'seeking': 'Seeking Clarity & Support',
      'rebuilding': 'Rebuilding Your Foundation'
    };

    const bandLabel = bandLabels[band] || band;

    // Get the specific group ID for this band
    const groupId = MAILERLITE_GROUP_IDS[band];

    if (!groupId) {
      Logger.log('Warning: No group ID found for band: ' + band);
      return 'error: Unknown band - ' + band;
    }

    const subscriberData = {
      email: email,
      fields: {
        name: name || '',
        band: bandLabel,
        signup_source: 'Assessment 2 - Coaching Readiness',
        assessment_date: new Date().toISOString().split('T')[0]
      },
      groups: [groupId]
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + MAILERLITE_API_KEY
      },
      payload: JSON.stringify(subscriberData),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch('https://connect.mailerlite.com/api/subscribers', options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();

    Logger.log('MailerLite API response code: ' + responseCode);
    Logger.log('MailerLite API response: ' + responseBody);

    if (responseCode === 200 || responseCode === 201) {
      return 'success';
    } else {
      return 'error: ' + responseBody;
    }
  } catch (error) {
    Logger.log('MailerLite error: ' + error.toString());
    return 'error: ' + error.toString();
  }
}

// Test function to verify setup
function testSetup() {
  const sheet = getOrCreateSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Setup successful!');
}
