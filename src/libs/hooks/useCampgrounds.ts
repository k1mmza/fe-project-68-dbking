import { useState } from 'react';
import { apiClient } from '../api/apiClient'; // Our new fetch wrapper
import { Campground } from '../types';

export const useCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [singleCampground, setSingleCampground] = useState<Campground | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Step 3: View All Products
  const getCampgrounds = async () => {
    setLoading(true);
    try {
      const data = await apiClient('/campgrounds');
      setCampgrounds(data.data);
    } catch (err) {
      console.error("Failed to fetch campgrounds", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: View Single Product Detail
  const getCampgroundById = async (id: string) => {
    setLoading(true);
    try {
      const data = await apiClient(`/campgrounds/${id}`);
      setSingleCampground(data.data);
    } catch (err) {
      console.error("Failed to fetch campground details", err);
    } finally {
      setLoading(false);
    }
  };

  return { campgrounds, singleCampground, getCampgrounds, getCampgroundById, loading };
};