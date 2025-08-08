'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
  Alert,
  Skeleton,
} from '@mui/material';
import { AccessTime, CheckCircle } from '@mui/icons-material';

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  selectedDate: Date | null;
  businessId?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  isSelected: boolean;
}

export default function TimeSlotPicker({
  selectedTime,
  onTimeSelect,
  selectedDate,
  businessId,
}: TimeSlotPickerProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Çalışma saatleri (9:00 - 18:00)
  const workingHours = {
    start: 9,
    end: 18,
    interval: 30, // 30 dakikalık aralıklar
  };

  // Mock müsait saatleri oluştur
  const generateTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += workingHours.interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Bugün için geçmiş saatleri devre dışı bırak
        let available = true;
        if (isToday) {
          const slotHour = hour;
          const slotMinute = minute;
          if (slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute)) {
            available = false;
          }
        }

        // Rastgele bazı saatleri dolu göster (mock veri)
        if (available && Math.random() < 0.3) {
          available = false;
        }

        slots.push({
          time: timeString,
          available,
          isSelected: selectedTime === timeString,
        });
      }
    }

    return slots;
  };

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    setLoading(true);
    setError('');

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      try {
        const slots = generateTimeSlots(selectedDate);
        setTimeSlots(slots);
        setLoading(false);
      } catch (err) {
        setError('Saat bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    }, 500);
  }, [selectedDate, selectedTime]);

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
    setTimeSlots(prev => 
      prev.map(slot => ({
        ...slot,
        isSelected: slot.time === time,
      }))
    );
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('tr-TR', options);
  };

  if (!selectedDate) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Önce bir tarih seçin
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Müsait Saatler
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {formatDate(selectedDate)}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Grid container spacing={1}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Skeleton variant="rectangular" height={40} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={1}>
            {timeSlots.map((slot) => (
              <Grid item xs={4} key={slot.time}>
                <Button
                  variant={slot.isSelected ? 'contained' : 'outlined'}
                  fullWidth
                  disabled={!slot.available}
                  onClick={() => handleTimeSelect(slot.time)}
                  startIcon={slot.isSelected ? <CheckCircle /> : <AccessTime />}
                  sx={{
                    height: 40,
                    fontSize: '0.875rem',
                    ...(slot.isSelected && {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }),
                    ...(!slot.available && {
                      opacity: 0.5,
                      textDecoration: 'line-through',
                    }),
                  }}
                >
                  {slot.time}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="Müsait"
              size="small"
              color="success"
              variant="outlined"
            />
            <Chip
              label="Seçili"
              size="small"
              color="primary"
            />
            <Chip
              label="Dolu"
              size="small"
              variant="outlined"
              sx={{ opacity: 0.5 }}
            />
          </Box>
        </>
      )}
    </Paper>
  );
}
