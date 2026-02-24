# Notification Testing Guide

## Overview
This guide will help you test the notification system thoroughly to ensure it works reliably on both iOS and Android devices.

## Prerequisites

1. **Physical devices required** (notifications don't work reliably in simulators)
   - iOS device running iOS 15+
   - Android device running Android 10+

2. **Install Expo Go** on both devices
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

3. **Start the app**:
   ```bash
   cd emoti-app
   npm start
   ```

## Phase 1: Basic Notification Setup (Day 1)

### Test 1: Permission Request
**Goal**: Verify permission dialog appears and permissions are granted

1. Fresh install: Delete app and reinstall
2. Complete onboarding (name + frequency)
3. **Expected**: Permission dialog appears
4. Grant permissions
5. **Expected**: "Setting up..." shows briefly
6. **Expected**: Navigates to Home screen

**Pass Criteria**:
- ✅ Permission dialog appears on both iOS and Android
- ✅ No errors in console
- ✅ App navigates to Home after setup

### Test 2: Notification Scheduling
**Goal**: Verify notifications are scheduled

1. Open Expo console/terminal
2. Look for logs: "Generated notification times: [...]"
3. Look for logs: "Successfully scheduled X notifications"

**Pass Criteria**:
- ✅ Console shows X notifications scheduled (where X = your frequency)
- ✅ Times are within wake/sleep hours (default: 7 AM - 10 PM)
- ✅ Times are at least 60 minutes apart

### Test 3: First Notification Arrives
**Goal**: Verify notification actually arrives

1. Set frequency to 8 (maximum) for faster testing
2. Complete onboarding
3. Wait for first notification (check console for scheduled time)
4. Keep app in FOREGROUND first

**Pass Criteria**:
- ✅ Notification arrives at scheduled time (±2 minutes)
- ✅ Shows correct title: "Emoti"
- ✅ Shows random message (e.g., "What emotion is arising right now?")
- ✅ Notification plays sound

---

## Phase 2: Notification States (Day 2)

### Test 4: Foreground Notifications
**Goal**: Verify notifications work when app is open

1. Keep app open on any screen
2. Wait for next scheduled notification
3. **Expected**: Notification banner appears
4. **Don't tap** - just observe

**Pass Criteria**:
- ✅ Notification appears as banner/alert
- ✅ Sound plays
- ✅ App doesn't crash

### Test 5: Background Notifications
**Goal**: Verify notifications work when app is backgrounded

1. Open app, then press Home button (app goes to background)
2. Wait for next scheduled notification
3. **Expected**: Notification appears in notification center

**Pass Criteria**:
- ✅ Notification appears
- ✅ Sound/vibration works
- ✅ Can see notification in notification drawer/center

### Test 6: Force Quit Notifications (MOST CRITICAL)
**Goal**: Verify notifications work when app is fully closed

**iOS:**
1. Double-tap Home button (or swipe up)
2. Swipe Emoti app up to force quit
3. Wait for next scheduled notification

**Android:**
1. Open Recent Apps
2. Swipe Emoti away to close
3. Wait for next scheduled notification

**Pass Criteria**:
- ✅ Notification arrives even though app is closed
- ✅ Notification content is correct
- ✅ This is THE most important test - if this fails, the app is not usable

**If this test fails:**
- Check iOS Background App Refresh is enabled
- Check Android battery optimization is disabled for the app
- Check notification permissions are still granted
- Review console logs for errors

---

## Phase 3: Notification Tap Handling (Day 2-3)

### Test 7: Tap Notification (App Closed)
1. Force quit app
2. Wait for notification
3. Tap the notification
4. **Expected**: App opens to EmotionLogScreen

**Pass Criteria**:
- ✅ App launches
- ✅ Opens directly to EmotionLogScreen (not Home)
- ✅ Emotion selection works normally

### Test 8: Tap Notification (App Backgrounded)
1. Open app, then background it
2. Wait for notification
3. Tap notification
4. **Expected**: App comes to foreground on EmotionLogScreen

**Pass Criteria**:
- ✅ App comes to foreground
- ✅ Navigates to EmotionLogScreen
- ✅ Previous screen state is preserved

### Test 9: Tap Notification (App Foreground)
1. Keep app open on Home screen
2. Wait for notification
3. Tap notification banner
4. **Expected**: Navigates to EmotionLogScreen

**Pass Criteria**:
- ✅ Navigates to EmotionLogScreen
- ✅ Can navigate back normally

---

## Phase 4: Frequency and Rescheduling (Day 3)

### Test 10: Change Frequency
1. Go to Settings
2. Change frequency from 3 to 5
3. Check console for: "Rescheduling notifications"
4. Check console for: "Successfully scheduled 5 notifications"

**Pass Criteria**:
- ✅ Console shows rescheduling happened
- ✅ New notifications scheduled (check console times)
- ✅ Old notifications cancelled
- ✅ New frequency takes effect

### Test 11: Multiple Notifications Per Day
1. Set frequency to 8 (maximum)
2. Wait throughout the day
3. Track how many notifications actually arrive

**Pass Criteria**:
- ✅ All 8 notifications arrive (±1 is acceptable)
- ✅ Each notification is at least 60 minutes apart
- ✅ All within wake hours (7 AM - 10 PM)

---

## Phase 5: Daily Regeneration (Day 4-5)

### Test 12: New Day Notification Regeneration
**This is critical - notifications should regenerate with NEW random times each day**

**Day 1:**
1. Note the scheduled times in console (e.g., 9:15 AM, 2:30 PM, 7:45 PM)
2. Let all notifications fire throughout the day

**Day 2 (Next Calendar Day):**
1. Open app first thing in the morning (before first notification time)
2. Check console for: "New day detected, regenerating notifications"
3. Check console for new scheduled times
4. **Expected**: Times are DIFFERENT from Day 1

**Pass Criteria**:
- ✅ Console shows "New day detected"
- ✅ New times are generated (different from previous day)
- ✅ Notifications arrive at new times
- ✅ Process repeats automatically each day

### Test 13: Mid-Day App Open
1. Let Day 1 notifications fire
2. Don't open app until Day 2 afternoon
3. Open app
4. **Expected**: Should regenerate for current day

**Pass Criteria**:
- ✅ Notifications regenerate even if app wasn't opened at midnight
- ✅ Notifications for "today" are scheduled correctly

---

## Phase 6: Edge Cases (Day 5-6)

### Test 14: Clear Data
1. Log several emotions
2. Go to Settings → Clear All Records
3. Confirm deletion
4. **Expected**: Navigates to Welcome screen

**Pass Criteria**:
- ✅ All data cleared
- ✅ Notifications cancelled (check console)
- ✅ Returns to onboarding
- ✅ Can set up again fresh

### Test 15: Phone Restart
1. Note scheduled notification times
2. Restart your phone completely (power off/on)
3. Open app after restart
4. Check if notifications are still scheduled

**Pass Criteria**:
- ✅ Notifications persist after phone restart (iOS)
- ✅ Notifications may need rescheduling on Android (acceptable)

### Test 16: Notification Permission Revocation
1. Go to phone Settings → Emoti → Notifications → Turn OFF
2. Open Emoti app
3. Try to change frequency in Settings

**Expected Behavior**:
- Notifications won't arrive (obviously)
- App shouldn't crash
- Should show some indication that permissions are needed

### Test 17: Rapid Frequency Changes
1. Go to Settings
2. Quickly change: 3 → 5 → 1 → 8
3. Check console for errors

**Pass Criteria**:
- ✅ No crashes
- ✅ Final frequency (8) takes effect
- ✅ Correct number of notifications scheduled

---

## Phase 7: Multi-Day Reliability Test (Day 6-10)

### Test 18: 5-Day Continuous Use
**This is the ultimate test - use the app normally for 5 days**

**Each day:**
1. Open app at least once
2. Track how many notifications arrive
3. Respond to at least one notification
4. Log your emotions

**Expected:**
- Notifications arrive daily at random times
- Times are different each day
- No crashes or errors
- App remains responsive

**Pass Criteria**:
- ✅ 90%+ of notifications arrive on time
- ✅ Daily regeneration works consistently
- ✅ No missed days
- ✅ App feels reliable and trustworthy

---

## Platform-Specific Checks

### iOS Specific
- [ ] Notification permissions stay granted
- [ ] Background App Refresh is enabled
- [ ] Do Not Disturb doesn't block notifications (or does, as expected)
- [ ] Badge number shows unread notifications
- [ ] Notifications appear on Lock Screen
- [ ] Notifications appear in Notification Center
- [ ] Notification sounds work
- [ ] Haptic feedback works

### Android Specific
- [ ] Notification channel created correctly
- [ ] Notifications are "high priority"
- [ ] Battery optimization disabled for app
- [ ] Notifications survive phone restart
- [ ] Notifications appear in notification drawer
- [ ] Sound and vibration work
- [ ] App isn't killed by battery saver

---

## Troubleshooting Common Issues

### Issue: Notifications not arriving when app is force-quit

**iOS:**
- Check: Settings → Emoti → Background App Refresh (must be ON)
- Check: Notification permissions granted
- Try: Reinstall app and test again
- Note: iOS is strict about background tasks

**Android:**
- Check: Settings → Battery → Emoti → Unrestricted
- Check: Settings → Apps → Emoti → Battery → Optimize → Don't optimize
- Try: Disable battery saver mode
- Note: Manufacturer-specific battery optimizations may interfere

### Issue: Wrong number of notifications

**Check:**
- Console logs for "Successfully scheduled X notifications"
- Settings screen shows correct frequency
- No errors in scheduling logs

**Fix:**
- Go to Settings, change frequency, change back
- Should trigger rescheduling

### Issue: Notifications not regenerating daily

**Check:**
- Console log for "New day detected"
- Storage key `@emoti_last_schedule` has today's date

**Fix:**
- Clear app data and restart onboarding
- Check `shouldRegenerateNotifications()` logic

### Issue: Tapping notification doesn't open EmotionLogScreen

**Check:**
- AppNavigator has notification listener
- Notification data includes `screen: "EmotionLog"`
- Navigation ref is properly set up

---

## Success Criteria Summary

For the notification system to be considered **production-ready**, ALL of these must pass:

### Critical (Must Pass):
- ✅ Notifications arrive when app is force-quit (iOS and Android)
- ✅ Daily regeneration works consistently over 5+ days
- ✅ Tapping notification opens EmotionLogScreen
- ✅ Correct number of notifications per day
- ✅ Minimum 60-minute gap maintained

### High Priority (Should Pass):
- ✅ Notifications work in all states (foreground, background, closed)
- ✅ Changing frequency reschedules correctly
- ✅ Random times generated within wake/sleep window
- ✅ No crashes or errors during normal usage

### Medium Priority (Nice to Have):
- ✅ Notifications persist after phone restart
- ✅ Error messages shown when permissions denied
- ✅ Console logs helpful for debugging

---

## Testing Checklist

Use this checklist to track your testing progress:

**Day 1-2: Basic Setup**
- [ ] Test 1: Permission request
- [ ] Test 2: Notification scheduling
- [ ] Test 3: First notification arrives
- [ ] Test 4: Foreground notifications
- [ ] Test 5: Background notifications
- [ ] Test 6: Force quit notifications ⚠️ CRITICAL

**Day 2-3: Interaction**
- [ ] Test 7: Tap notification (app closed)
- [ ] Test 8: Tap notification (backgrounded)
- [ ] Test 9: Tap notification (foreground)
- [ ] Test 10: Change frequency
- [ ] Test 11: Multiple notifications per day

**Day 4-5: Daily Regeneration**
- [ ] Test 12: New day regeneration ⚠️ CRITICAL
- [ ] Test 13: Mid-day app open

**Day 5-6: Edge Cases**
- [ ] Test 14: Clear data
- [ ] Test 15: Phone restart
- [ ] Test 16: Permission revocation
- [ ] Test 17: Rapid frequency changes

**Day 6-10: Long-term Reliability**
- [ ] Test 18: 5-day continuous use ⚠️ CRITICAL

---

## Reporting Issues

If you find bugs, document:
1. **Device**: iPhone 14 Pro / Samsung Galaxy S23
2. **OS Version**: iOS 17.2 / Android 13
3. **Test**: Which test number failed
4. **Expected**: What should have happened
5. **Actual**: What actually happened
6. **Console Logs**: Copy relevant error messages
7. **Steps to Reproduce**: Exact steps to recreate the issue

---

## Next Steps After Testing

Once all tests pass:
1. Document any known limitations
2. Create user-facing documentation
3. Prepare for Week 9 production builds
4. Plan for app store submission

Good luck with testing! The notification system is the heart of Emoti - take your time to ensure it's rock solid.
