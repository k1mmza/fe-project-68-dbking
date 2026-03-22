import { useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Campground } from '../types';

export const useCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);
  const [singleCampground, setSingleCampground] = useState<Campground | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // View All Campgrounds
  const getCampgrounds = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient('/campgrounds');
      setCampgrounds(data.data);
    } catch (err) {
      console.error("Failed to fetch campgrounds", err);
      setError("Failed to load campgrounds");
    } finally {
      setLoading(false);
    }
  };

  // View Single Campground
  const getCampgroundById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient(`/campgrounds/${id}`);
      setSingleCampground(data.data);
    } catch (err) {
      console.error("Failed to fetch campground details", err);
      setError("Failed to load campground details");
    } finally {
      setLoading(false);
    }
  };

  return { 
    campgrounds,
    singleCampground,
    getCampgrounds,
    getCampgroundById,
    loading,
    error
  };
};