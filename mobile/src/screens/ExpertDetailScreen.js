import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchExpertDetails, fetchExpertBookings } from '../services/api';
import socketService from '../services/socket';
import { Calendar } from 'react-native-calendars';

const ExpertDetailScreen = ({ route, navigation }) => {
  const { expertId } = route.params;
  const [expert, setExpert] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const availableTimeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const expertData = await fetchExpertDetails(expertId);
        setExpert(expertData);
        await loadBookedSlots(selectedDate);
      } catch (error) {
        console.error('Error fetching details', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [expertId]);

  useEffect(() => {
    loadBookedSlots(selectedDate);
  }, [selectedDate]);

  const loadBookedSlots = async (date) => {
    try {
      const bookings = await fetchExpertBookings(expertId, date);
      setBookedSlots(bookings.map(b => b.timeSlot));
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  useEffect(() => {
    socketService.connect();
    
    const handleSlotBooked = (data) => {
      if (data.expertId === expertId && data.date === selectedDate) {
        setBookedSlots((prev) => {
          if (!prev.includes(data.timeSlot)) {
            return [...prev, data.timeSlot];
          }
          return prev;
        });
      }
    };

    socketService.onSlotBooked(handleSlotBooked);

    return () => {
      socketService.offSlotBooked(handleSlotBooked);
    };
  }, [expertId, selectedDate]);

  if (loading || !expert) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: expert.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{expert.name}</Text>
        <Text style={styles.category}>{expert.category}</Text>
        <Text style={styles.rating}>⭐ {expert.rating.toFixed(1)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          Experienced {expert.category} professional with {expert.experience} years of expertise.
        </Text>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#1976d2' }
          }}
          minDate={(() => {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          })()}
          theme={{
            selectedDayBackgroundColor: '#1976d2',
            todayTextColor: '#1976d2',
            arrowColor: '#1976d2',
          }}
          style={styles.calendar}
        />

        <Text style={styles.sectionTitle}>Available Slots ({selectedDate})</Text>
        <View style={styles.slotsContainer}>
          {availableTimeSlots.map((slot) => {
            let isPast = false;
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            
            if (selectedDate < todayStr) {
              isPast = true;
            } else if (selectedDate === todayStr) {
              const [slotHour, slotMinute] = slot.split(':').map(Number);
              if (slotHour < now.getHours() || (slotHour === now.getHours() && slotMinute <= now.getMinutes())) {
                isPast = true;
              }
            }

            const isBooked = bookedSlots.includes(slot) || isPast;
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.slot, isBooked && styles.slotBooked]}
                disabled={isBooked}
                onPress={() => navigation.navigate('Booking', { expert, date: selectedDate, timeSlot: slot })}
              >
                <Text style={[styles.slotText, isBooked && styles.slotTextBooked]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  calendar: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  slot: {
    width: '30%',
    margin: '1.5%',
    paddingVertical: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    alignItems: 'center',
  },
  slotBooked: {
    backgroundColor: '#e0e0e0',
  },
  slotText: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  slotTextBooked: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },
});

export default ExpertDetailScreen;
