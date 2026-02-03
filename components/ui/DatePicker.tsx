import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isDateInRange = (day: number) => {
    if (!startDate || !endDate || !day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const start = new Date(startDate);
    const end = new Date(endDate);
    return date >= start && date <= end;
  };

  const isStartDate = (day: number) => {
    if (!startDate || !day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const start = new Date(startDate);
    return date.toDateString() === start.toDateString();
  };

  const isEndDate = (day: number) => {
    if (!endDate || !day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const end = new Date(endDate);
    return date.toDateString() === end.toDateString();
  };

  const isPastDate = (day: number) => {
    if (!day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const selectDate = (day: number) => {
    if (!day || isPastDate(day)) return;

    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateStr = selectedDate.toISOString().split('T')[0];

    if (selectingStart) {
      onStartDateChange(dateStr);
      if (endDate && new Date(dateStr) > new Date(endDate)) {
        onEndDateChange('');
      }
      setSelectingStart(false);
    } else {
      if (new Date(dateStr) < new Date(startDate)) {
        onStartDateChange(dateStr);
        onEndDateChange(startDate);
      } else {
        onEndDateChange(dateStr);
      }
      setShowPicker(false);
      setSelectingStart(true);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    const today = new Date();
    if (
      prev.getFullYear() > today.getFullYear() ||
      (prev.getFullYear() === today.getFullYear() &&
        prev.getMonth() >= today.getMonth())
    ) {
      setCurrentMonth(prev);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>When are you traveling?</Text>
      <View style={styles.dateButtons}>
        <TouchableOpacity
          style={[styles.dateButton, selectingStart && showPicker && styles.dateButtonActive]}
          onPress={() => {
            setSelectingStart(true);
            setShowPicker(true);
          }}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.primary[500]} />
          <View style={styles.dateButtonText}>
            <Text style={styles.dateLabel}>Start</Text>
            <Text style={styles.dateValue}>{formatDisplayDate(startDate)}</Text>
          </View>
        </TouchableOpacity>

        <Ionicons name="arrow-forward" size={20} color={colors.neutral[300]} />

        <TouchableOpacity
          style={[styles.dateButton, !selectingStart && showPicker && styles.dateButtonActive]}
          onPress={() => {
            setSelectingStart(false);
            setShowPicker(true);
          }}
        >
          <Ionicons name="calendar-outline" size={20} color={colors.primary[500]} />
          <View style={styles.dateButtonText}>
            <Text style={styles.dateLabel}>End</Text>
            <Text style={styles.dateValue}>{formatDisplayDate(endDate)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {selectingStart ? 'Start' : 'End'} Date
              </Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Ionicons name="close" size={24} color={colors.neutral[600]} />
              </TouchableOpacity>
            </View>

            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.monthNavButton}>
                <Ionicons name="chevron-back" size={24} color={colors.neutral[600]} />
              </TouchableOpacity>
              <Text style={styles.monthTitle}>
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.monthNavButton}>
                <Ionicons name="chevron-forward" size={24} color={colors.neutral[600]} />
              </TouchableOpacity>
            </View>

            <View style={styles.daysHeader}>
              {DAYS.map((day) => (
                <Text key={day} style={styles.dayHeaderText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    day && isDateInRange(day) ? styles.dayInRange : undefined,
                    day && isStartDate(day) ? styles.daySelected : undefined,
                    day && isEndDate(day) ? styles.daySelected : undefined,
                    day && isPastDate(day) ? styles.dayDisabled : undefined,
                  ]}
                  onPress={() => day && selectDate(day)}
                  disabled={!day || isPastDate(day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day && (isStartDate(day) || isEndDate(day)) ? styles.dayTextSelected : undefined,
                      day && isPastDate(day) ? styles.dayTextDisabled : undefined,
                    ]}
                  >
                    {day || ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
    marginBottom: 12,
  },
  dateButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    padding: 16,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateButtonActive: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  dateButtonText: {
    marginLeft: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[400],
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: (width - 48) / 7,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayInRange: {
    backgroundColor: colors.primary[50],
  },
  daySelected: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.full,
  },
  dayDisabled: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: colors.neutral[900],
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  dayTextDisabled: {
    color: colors.neutral[400],
  },
});
