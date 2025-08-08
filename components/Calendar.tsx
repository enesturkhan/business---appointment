'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
} from '@mui/icons-material';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ 
  selectedDate, 
  onDateSelect, 
  minDate = new Date(),
  maxDate 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Önceki ayın günleri
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      });
    }

    // Mevcut ayın günleri
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
      const isDisabled = date < minDate || (maxDate && date > maxDate);

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled,
      });
    }

    // Sonraki ayın günleri
    const remainingDays = 42 - days.length; // 6 hafta x 7 gün
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (date >= minDate && (!maxDate || date <= maxDate)) {
      onDateSelect(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    if (today >= minDate && (!maxDate || today <= maxDate)) {
      onDateSelect(today);
      setCurrentMonth(today);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return (
    <Paper sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Typography>
        <Box>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={handleToday} size="small">
            <Today />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      {/* Week days */}
      <Grid container sx={{ mb: 1 }}>
        {weekDays.map((day) => (
          <Grid item xs={12/7} key={day}>
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar grid */}
      <Grid container>
        {days.map((day, index) => (
          <Grid item xs={12/7} key={index}>
            <Button
              variant={day.isSelected ? 'contained' : 'text'}
              size="small"
              disabled={day.isDisabled}
              onClick={() => handleDateClick(day.date)}
              sx={{
                minWidth: 'auto',
                height: 40,
                borderRadius: '50%',
                color: day.isCurrentMonth ? 'text.primary' : 'text.disabled',
                backgroundColor: day.isSelected ? 'primary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: day.isSelected ? 'primary.dark' : 'action.hover',
                },
                ...(day.isToday && !day.isSelected && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                }),
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: day.isToday ? 'bold' : 'normal',
                  color: day.isSelected ? 'white' : 'inherit',
                }}
              >
                {day.date.getDate()}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Legend */}
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="Bugün"
          size="small"
          variant="outlined"
          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
        />
        <Chip
          label="Seçili"
          size="small"
          color="primary"
        />
      </Box>
    </Paper>
  );
}
