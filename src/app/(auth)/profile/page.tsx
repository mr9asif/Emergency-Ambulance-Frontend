"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  Save,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import DefaultImage from "../../../../public/images/default-profile.jpeg";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useUpdateProfileName } from "@/features/auth/hooks/useUpateProfileName";
import { useUpdateProfileImage } from "@/features/auth/hooks/useUpdateProfileImage";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // =========================================================
  // CURRENT USER
  // =========================================================

  const { data: user, isLoading } = useCurrentUser();

  // =========================================================
  // PROFILE IMAGE MUTATION
  // =========================================================

  const { mutate: updateProfileImage, isPending: isUploading } =
    useUpdateProfileImage();

  // =========================================================
  // PROFILE NAME MUTATION
  // =========================================================

  const { mutate: updateProfileName, isPending: isUpdatingName } =
    useUpdateProfileName();

  // =========================================================
  // REFS
  // =========================================================

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // =========================================================
  // PROFILE IMAGE STATE
  // =========================================================

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // =========================================================
  // MESSAGE STATE
  // =========================================================

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =========================================================
  // CLEANUP PREVIEW URL
  // =========================================================

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // =========================================================
  // SELECT PROFILE IMAGE
  // =========================================================

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    // Check image type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // Check image size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // Remove previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(previewUrl);
  };

  // =========================================================
  // UPLOAD PROFILE IMAGE
  // =========================================================

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    updateProfileImage(selectedFile, {
      onSuccess: async () => {
        setSelectedFile(null);

        if (preview) {
          URL.revokeObjectURL(preview);
        }

        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Refetch current user immediately
        await queryClient.refetchQueries({
          queryKey: ["current-user"],
        });

        setSuccessMessage("Profile image updated successfully.");
      },

      onError: (error: unknown) => {
        console.error("Profile image update error:", error);

        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message || "Failed to update profile image.",
          );
        } else {
          setErrorMessage("Failed to update profile image.");
        }
      },
    });
  };

  // =========================================================
  // CANCEL IMAGE
  // =========================================================

  const handleCancelImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setSelectedFile(null);

    setSuccessMessage("");
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // UPDATE NAME
  // =========================================================

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = nameInputRef.current;

    if (!input) {
      return;
    }

    const newName = input.value.trim();

    setSuccessMessage("");
    setErrorMessage("");

    // Empty name
    if (!newName) {
      setErrorMessage("Name cannot be empty.");
      return;
    }

    // Minimum length
    if (newName.length < 2) {
      setErrorMessage("Name must be at least 2 characters long.");
      return;
    }

    // Maximum length
    if (newName.length > 100) {
      setErrorMessage("Name cannot exceed 100 characters.");
      return;
    }

    // No changes
    if (newName === user?.name) {
      setSuccessMessage("No changes were made.");
      return;
    }

    // Call backend
    updateProfileName(newName, {
      onSuccess: async (response) => {
        console.log("Name update response:", response);

        /*
         * Backend response:
         *
         * {
         *   success: true,
         *   statusCode: 200,
         *   message: "Name updated successfully",
         *   data: updatedUser
         * }
         */

        if (response?.data) {
          // Update React Query cache immediately
          queryClient.setQueryData(["current-user"], response.data);
        } else {
          // Fallback if backend doesn't return user
          await queryClient.refetchQueries({
            queryKey: ["current-user"],
          });
        }

        setSuccessMessage("Name updated successfully.");

        setErrorMessage("");
      },

      onError: (error: unknown) => {
        console.error("Name update error:", error);

        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message || "Failed to update name.",
          );
        } else {
          setErrorMessage("Failed to update name.");
        }

        setSuccessMessage("");
      },
    });
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-24 dark:bg-black sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {/* Header skeleton */}
            <div className="h-48 animate-pulse bg-slate-200 dark:bg-zinc-800 sm:h-56" />

            <div className="px-6 pb-10 sm:px-10">
              <div className="-mt-20 flex flex-col items-center sm:-mt-24">
                <div className="h-36 w-36 animate-pulse rounded-full border-8 border-white bg-slate-200 dark:border-zinc-950 dark:bg-zinc-800" />

                <div className="mt-5 h-7 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-800" />

                <div className="mt-3 h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-900" />

                <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-900" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // USER NOT FOUND
  // =========================================================

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-black">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
            <User size={26} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Please login again to continue.
          </p>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const currentImage = preview || user.profileImage || DefaultImage;

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 dark:bg-black sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-red-900/50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Home
          </button>
        </div>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-rose-500 sm:h-56">
            {/* Decorative shapes */}
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-black/10" />

            <div className="absolute right-10 top-10 h-20 w-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />

            {/* Header text */}
            <div className="absolute left-6 top-6 text-white sm:left-10 sm:top-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Account
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-white/75">
                Manage your personal information
              </p>
            </div>
          </div>

          {/* =================================================
              PROFILE CONTENT
          ================================================= */}

          <div className="relative px-6 pb-8 sm:px-10">
            {/* =================================================
                PROFILE IDENTITY
            ================================================= */}

            <div className="-mt-20 flex flex-col items-center sm:-mt-24">
              {/* Profile image */}
              <div className="relative">
                <div className="rounded-full border-[7px] border-white bg-white p-1 shadow-xl dark:border-zinc-950 dark:bg-zinc-950">
                  <Image
                    src={currentImage}
                    alt={user.name || "Profile"}
                    width={150}
                    height={150}
                    className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
                  />
                </div>

                {/* Camera button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isUpdatingName}
                  aria-label="Change profile image"
                  className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-red-500 text-white shadow-lg transition hover:scale-105 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-950"
                >
                  <Camera size={19} />
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Name */}
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {user.name}
              </h2>

              {/* Email */}
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                <Mail size={15} />

                <span>{user.email}</span>
              </div>

              {/* Account status */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:border-green-900/50 dark:bg-green-500/10 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Account Active
              </div>
            </div>

            {/* =================================================
                IMAGE ACTIONS
            ================================================= */}

            {selectedFile && (
              <div className="mx-auto mt-7 max-w-md rounded-2xl border border-red-100 bg-red-50/70 p-4 dark:border-red-900/30 dark:bg-red-500/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                      Ready to upload
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelImage}
                    disabled={isUploading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-red-500 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    aria-label="Cancel image selection"
                  >
                    <X size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera size={17} />
                      Upload New Profile Image
                    </>
                  )}
                </button>
              </div>
            )}

            {/* =================================================
                PROFILE SETTINGS
            ================================================= */}

            <div className="mt-10">
              {/* Section heading */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Profile Settings
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Update your profile picture and account information.
                </p>
              </div>

              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {successMessage && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-500/10 dark:text-green-400">
                  <CheckCircle2 size={19} className="shrink-0" />

                  <span>{successMessage}</span>
                </div>
              )}

              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {errorMessage && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
                  <X size={18} className="shrink-0" />

                  <span>{errorMessage}</span>
                </div>
              )}

              {/* =================================================
                  UPDATE NAME
              ================================================= */}

              <form
                onSubmit={handleNameSubmit}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                    <User size={20} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Update Name
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-zinc-400">
                      Change the name displayed on your profile.
                    </p>
                  </div>
                </div>

                {/* Name input */}
                <div className="mt-5">
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
                    />

                    <input
                      ref={nameInputRef}
                      id="profile-name"
                      type="text"
                      defaultValue={user.name ?? ""}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={isUpdatingName}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:disabled:bg-zinc-900"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400 dark:text-zinc-600">
                    Your name must be between 2 and 100 characters.
                  </p>
                </div>

                {/* Save button */}
                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingName}
                    className="inline-flex min-w-[145px] items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-red-500/20 transition hover:bg-red-600 hover:shadow-md hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUpdatingName ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* =================================================
                  ACCOUNT INFORMATION
              ================================================= */}

              <div className="mt-7">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Account Information
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                    Your basic account details.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-red-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-red-900/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-red-50 group-hover:text-red-500 dark:bg-zinc-900 dark:text-zinc-300 dark:group-hover:bg-red-500/10 dark:group-hover:text-red-400">
                        <User size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
                          Full Name
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-red-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-red-900/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-red-50 group-hover:text-red-500 dark:bg-zinc-900 dark:text-zinc-300 dark:group-hover:bg-red-500/10 dark:group-hover:text-red-400">
                        <Mail size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
                          Email Address
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-600">
          Keep your profile information up to date.
        </p>
      </div>
    </main>
  );
}
