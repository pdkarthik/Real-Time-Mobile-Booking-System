import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { fetchExperts } from '../services/api';
import ExpertCard from '../components/ExpertCard';

const ExpertListingScreen = ({ navigation }) => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadingRef = useRef(false);

  const categories = ['All', 'Health', 'Finance', 'Technology', 'Career'];

  const loadExperts = async (pageNum = 1, searchQuery = search, catQuery = category) => {
    if (loadingRef.current && pageNum !== 1) return;
    try {
      setLoading(true);
      loadingRef.current = true;
      const apiCategory = catQuery === 'All' ? '' : catQuery;
      const data = await fetchExperts(pageNum, searchQuery, apiCategory);
      setExperts(data.experts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching experts', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    loadExperts(1, search, category);
  }, [search, category]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      setPage(newPage);
      loadExperts(newPage, search, category);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity 
          style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
          onPress={() => handlePageChange(page - 1)}
          disabled={page === 1 || loading}
        >
          <Text style={[styles.pageButtonText, page === 1 && styles.pageButtonTextDisabled]}>&lt; Prev</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pageNumbersScroll}>
          {pageNumbers.map(num => (
            <TouchableOpacity 
              key={num}
              style={[styles.pageNumber, page === num && styles.pageNumberActive]}
              onPress={() => handlePageChange(num)}
              disabled={loading}
            >
              <Text style={[styles.pageNumberText, page === num && styles.pageNumberTextActive]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[styles.pageButton, page === totalPages && styles.pageButtonDisabled]}
          onPress={() => handlePageChange(page + 1)}
          disabled={page === totalPages || loading}
        >
          <Text style={[styles.pageButtonText, page === totalPages && styles.pageButtonTextDisabled]}>Next &gt;</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search experts by name..."
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setPage(1);
        }}
      />

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryChip, category === item && styles.categoryChipActive]}
              onPress={() => {
                setCategory(item);
                setPage(1);
              }}
            >
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={experts}
        keyExtractor={(item, index) => item._id + index.toString()}
        renderItem={({ item }) => (
          <ExpertCard 
            expert={item} 
            onPress={() => navigation.navigate('ExpertDetail', { expertId: item._id })}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              renderPagination()
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#1976d2',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  footerContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  pageButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  pageButtonText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  pageButtonTextDisabled: {
    color: '#aaa',
  },
  pageNumbersScroll: {
    maxWidth: 150,
  },
  pageNumber: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  pageNumberActive: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  pageNumberText: {
    color: '#333',
  },
  pageNumberTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExpertListingScreen;
