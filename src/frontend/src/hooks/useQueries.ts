import type {
  AvailabilityInfo,
  BookingRequest,
  BookingRequestInput,
  RoomNumber,
  UserProfile,
  UserRole,
} from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// OTP Authentication queries
export function useCreateOTP() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (mobileNumber: string) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.createOTP(mobileNumber);
    },
  });
}

export function useVerifyOTP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      mobileNumber,
      otp,
    }: { mobileNumber: string; otp: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.verifyOTP(mobileNumber, otp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCallerAuthenticated"] });
      queryClient.invalidateQueries({ queryKey: ["callerMobileNumber"] });
    },
  });
}

export function useIsCallerAuthenticated() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAuthenticated"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.isCallerAuthenticated();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerMobileNumber() {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ["callerMobileNumber"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getCallerMobileNumber();
    },
    enabled: !!actor && !isFetching,
  });
}

// Booking queries
export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: BookingRequestInput) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.createBooking(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["roomAvailability"] });
    },
  });
}

export function useGetMyBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<BookingRequest[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getMyBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<BookingRequest[]>({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApproveBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.approveBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["roomAvailability"] });
    },
  });
}

export function useRejectBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.rejectBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
}

export function useDeleteBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["roomAvailability"] });
    },
  });
}

export function useGetRoomAvailability(roomNumber: RoomNumber) {
  const { actor, isFetching } = useActor();

  return useQuery<AvailabilityInfo[]>({
    queryKey: ["roomAvailability", roomNumber],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getRoomAvailability(roomNumber);
    },
    enabled: !!actor && !isFetching,
  });
}

// User profile queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}
