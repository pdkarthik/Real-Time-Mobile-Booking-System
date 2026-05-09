import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { createBooking } from '../services/api';

const BookingScreen = ({ route, navigation }) => {
  const { expert, date, timeSlot } = route.params;
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = async () => {
    if (isBooked) return;
    if (!form.name || !form.email || !form.phone) {
      Alert.alert('Error', 'Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    try {
      setLoading(true);
      await createBooking({
        expertId: expert._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date,
        timeSlot,
        notes: form.notes
      });
      
      setIsBooked(true);
      Alert.alert('Success', 'Your booking has been confirmed!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to create booking';
      Alert.alert('Booking Failed', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text style={styles.summaryText}>Expert: {expert.name}</Text>
        <Text style={styles.summaryText}>Date: {date}</Text>
        <Text style={styles.summaryText}>Time: {timeSlot}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />

        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special requests or notes"
          multiline
          numberOfLines={4}
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
        />

        <TouchableOpacity 
          style={[styles.button, (loading || isBooked) && styles.buttonDisabled]} 
          onPress={handleBooking}
          disabled={loading || isBooked}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    backgroundColor: '#1976d2',
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#e3f2fd',
    marginBottom: 4,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
