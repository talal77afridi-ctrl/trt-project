"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SidebarItem } from "@/data/site";
import { ClothingMegaPanel } from "@/components/sidebar/mega-menu";
import {
  womenAccessoriesMenuItems,
  womenAccessoriesMenuSectionRows,
  womenAccessoriesMenuTitle,
  menClothingMenuItems,
  menClothingMenuSectionRows,
  menClothingMenuTitle,
  womenClothingMenuItems,
  womenClothingMenuSectionRows,
  womenClothingMenuTitle,
  womenFootwearMenuItems,
  womenFootwearMenuSectionRows,
  womenFootwearMenuTitle,
  womenLingerieMenuItems,
  womenLingerieMenuSectionRows,
  womenLingerieMenuTitle,
  menFootwearMenuItems,
  menFootwearMenuSectionRows,
  menFootwearMenuTitle,
  menAccessoriesMenuItems,
  menAccessoriesMenuSectionRows,
  menAccessoriesMenuTitle,
  menInnerMenuItems,
  menInnerMenuSectionRows,
  menInnerMenuTitle,
  beautyHairCareMenuItems,
  beautyHairCareMenuSectionRows,
  beautyHairCareMenuTitle,
  beautyBathBodyMenuItems,
  beautyBathBodyMenuSectionRows,
  beautyBathBodyMenuTitle,
  beautyMakeupMenuItems,
  beautyMakeupMenuSectionRows,
  beautyMakeupMenuTitle,
  beautySkincareMenuItems,
  beautySkincareMenuSectionRows,
  beautySkincareMenuTitle,
  beautyFragranceMenuItems,
  beautyFragranceMenuSectionRows,
  beautyFragranceMenuTitle,
  kidsGirlMenuItems,
  kidsGirlMenuSectionRows,
  kidsGirlMenuTitle,
  kidsBoyMenuItems,
  kidsBoyMenuSectionRows,
  kidsBoyMenuTitle,
  kidsBoyNewbornMenuItems,
  kidsBoyNewbornMenuSectionRows,
  kidsBoyNewbornMenuTitle,
  kidsGirlNewbornMenuItems,
  kidsGirlNewbornMenuSectionRows,
  kidsGirlNewbornMenuTitle,
} from "@/data/sidebar/mega-menu";

type SidebarNavProps = {
  items: SidebarItem[];
};

type AuthFeedback = {
  type: "success" | "error";
  message: string;
};

type OtpSession = {
  channel: "phone" | "email";
  contact: string;
};

type AuthProfile = {
  name: string;
  email: string;
  channel: "phone" | "email";
  contact: string;
};

export function SidebarNav({ items }: SidebarNavProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"women-clothing" | "women-accessories" | "women-footwear" | "women-lingerie" | "men-clothing" | "men-footwear" | "men-accessories" | "men-inner" | "beauty-hair-care" | "beauty-bath-body" | "beauty-makeup" | "beauty-skincare" | "beauty-fragrance" | "kids-girl" | "kids-boy" | "kids-boy-newborn" | "kids-girl-newborn" | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [authFeedback, setAuthFeedback] = useState<AuthFeedback | null>(null);
  const [otpSession, setOtpSession] = useState<OtpSession | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [isOtpTouched, setIsOtpTouched] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [isProfileNameTouched, setIsProfileNameTouched] = useState(false);
  const [isProfileEmailTouched, setIsProfileEmailTouched] = useState(false);
  const [authProfile, setAuthProfile] = useState<AuthProfile | null>(null);

  const backendApiBase = (process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000").replace(/\/$/, "");

  const expandableItems: Record<string, string[]> = {
    Women: ["Clothing", "Accessories", "Footwear", "Lingerie and Sleepwear"],
    Men: ["Clothing", "Footwear", "Accessories", "Inner and Sleepwear"],
    Beauty: ["Hair Care", "Bath & Body", "Makeup", "Skincare", "Fragrance"],
    Kids: ["Girl", "Boy", "Boy Newborn", "Girl Newborn"],
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const isPhoneValid = /^3\d{9}$/.test(phoneDigits);
  const showPhoneError = isPhoneTouched && !isPhoneValid;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showEmailError = isEmailTouched && !isEmailValid;
  const isOtpValid = /^\d{4,8}$/.test(otpCode.trim());
  const showOtpError = isOtpTouched && !isOtpValid;
  const isProfileNameValid = profileName.trim().length >= 2;
  const showProfileNameError = isProfileNameTouched && !isProfileNameValid;
  const isProfileEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileEmail.trim().toLowerCase());
  const showProfileEmailError = isProfileEmailTouched && !isProfileEmailValid;

  const deriveNameFromContact = (contact: string) => {
    if (!contact) {
      return "TRT User";
    }

    if (contact.includes("@")) {
      const localPart = contact.split("@")[0] || "TRT User";
      const cleaned = localPart
        .replace(/[._-]+/g, " ")
        .replace(/\d+/g, " ")
        .replace(/[^a-zA-Z\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (character) => character.toUpperCase());

      return cleaned || "TRT User";
    }

    return "TRT User";
  };

  useEffect(() => {
    const persistedProfile = window.localStorage.getItem("trt-auth-profile");

    if (!persistedProfile) {
      return;
    }

    try {
      const parsed = JSON.parse(persistedProfile) as AuthProfile;

      if (parsed?.name && parsed?.email && parsed?.channel && parsed?.contact) {
        setAuthProfile(parsed);
      }
    } catch {
      window.localStorage.removeItem("trt-auth-profile");
    }
  }, []);

  useEffect(() => {
    if (!authProfile) {
      window.localStorage.removeItem("trt-auth-profile");
      return;
    }

    window.localStorage.setItem("trt-auth-profile", JSON.stringify(authProfile));
  }, [authProfile]);

  useEffect(() => {
    if (!isAuthModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAuthModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (!isAuthModalOpen) {
      setAuthMode("phone");
      setIsPhoneTouched(false);
      setIsEmailTouched(false);
      setPhone("");
      setEmail("");
      setIsSubscribed(true);
      setIsRequestingOtp(false);
      setIsVerifyingOtp(false);
      setAuthFeedback(null);
      setOtpSession(null);
      setOtpCode("");
      setIsOtpTouched(false);
      setProfileName("");
      setProfileEmail("");
      setIsProfileNameTouched(false);
      setIsProfileEmailTouched(false);
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (openSection !== "Women" && openSection !== "Men" && openSection !== "Beauty" && openSection !== "Kids" && activeMegaMenu) {
      setActiveMegaMenu(null);
    }
  }, [activeMegaMenu, openSection]);

  const shouldShowMegaMenu =
    activeMegaMenu === "women-clothing" ||
    activeMegaMenu === "women-accessories" ||
    activeMegaMenu === "women-footwear" ||
    activeMegaMenu === "women-lingerie" ||
    activeMegaMenu === "men-clothing" ||
    activeMegaMenu === "men-footwear" ||
    activeMegaMenu === "men-accessories" ||
    activeMegaMenu === "men-inner" ||
    activeMegaMenu === "beauty-hair-care" ||
    activeMegaMenu === "beauty-bath-body" ||
    activeMegaMenu === "beauty-makeup" ||
    activeMegaMenu === "beauty-skincare" ||
    activeMegaMenu === "beauty-fragrance" ||
    activeMegaMenu === "kids-girl" ||
    activeMegaMenu === "kids-boy" ||
    activeMegaMenu === "kids-boy-newborn" ||
    activeMegaMenu === "kids-girl-newborn";

  const megaMenuData =
    activeMegaMenu === "women-accessories"
      ? {
          title: womenAccessoriesMenuTitle,
          items: womenAccessoriesMenuItems,
          sectionRows: womenAccessoriesMenuSectionRows,
        }
      : activeMegaMenu === "women-footwear"
        ? {
            title: womenFootwearMenuTitle,
            items: womenFootwearMenuItems,
            sectionRows: womenFootwearMenuSectionRows,
          }
      : activeMegaMenu === "women-lingerie"
        ? {
            title: womenLingerieMenuTitle,
            items: womenLingerieMenuItems,
            sectionRows: womenLingerieMenuSectionRows,
          }
      : activeMegaMenu === "men-clothing"
        ? {
            title: menClothingMenuTitle,
            items: menClothingMenuItems,
            sectionRows: menClothingMenuSectionRows,
          }
      : activeMegaMenu === "men-footwear"
        ? {
            title: menFootwearMenuTitle,
            items: menFootwearMenuItems,
            sectionRows: menFootwearMenuSectionRows,
          }
      : activeMegaMenu === "men-accessories"
        ? {
            title: menAccessoriesMenuTitle,
            items: menAccessoriesMenuItems,
            sectionRows: menAccessoriesMenuSectionRows,
            defaultOpenSectionTitle: "Eyewear",
          }
      : activeMegaMenu === "men-inner"
        ? {
            title: menInnerMenuTitle,
            items: menInnerMenuItems,
            sectionRows: menInnerMenuSectionRows,
          }
      : activeMegaMenu === "beauty-hair-care"
        ? {
            title: beautyHairCareMenuTitle,
            items: beautyHairCareMenuItems,
            sectionRows: beautyHairCareMenuSectionRows,
          }
      : activeMegaMenu === "beauty-bath-body"
        ? {
            title: beautyBathBodyMenuTitle,
            items: beautyBathBodyMenuItems,
            sectionRows: beautyBathBodyMenuSectionRows,
          }
      : activeMegaMenu === "beauty-makeup"
        ? {
            title: beautyMakeupMenuTitle,
            items: beautyMakeupMenuItems,
            sectionRows: beautyMakeupMenuSectionRows,
          }
      : activeMegaMenu === "beauty-skincare"
        ? {
            title: beautySkincareMenuTitle,
            items: beautySkincareMenuItems,
            sectionRows: beautySkincareMenuSectionRows,
          }
      : activeMegaMenu === "beauty-fragrance"
        ? {
            title: beautyFragranceMenuTitle,
            items: beautyFragranceMenuItems,
            sectionRows: beautyFragranceMenuSectionRows,
          }
      : activeMegaMenu === "kids-girl"
        ? {
            title: kidsGirlMenuTitle,
            items: kidsGirlMenuItems,
            sectionRows: kidsGirlMenuSectionRows,
          }
      : activeMegaMenu === "kids-boy"
        ? {
            title: kidsBoyMenuTitle,
            items: kidsBoyMenuItems,
            sectionRows: kidsBoyMenuSectionRows,
          }
      : activeMegaMenu === "kids-boy-newborn"
        ? {
            title: kidsBoyNewbornMenuTitle,
            items: kidsBoyNewbornMenuItems,
            sectionRows: kidsBoyNewbornMenuSectionRows,
          }
      : activeMegaMenu === "kids-girl-newborn"
        ? {
            title: kidsGirlNewbornMenuTitle,
            items: kidsGirlNewbornMenuItems,
            sectionRows: kidsGirlNewbornMenuSectionRows,
          }
      : {
          title: womenClothingMenuTitle,
          items: womenClothingMenuItems,
          sectionRows: womenClothingMenuSectionRows,
        };

  const handleOtpRequest = async () => {
    if (authMode === "phone") {
      setIsPhoneTouched(true);
      if (!isPhoneValid) {
        return;
      }
    } else {
      setIsEmailTouched(true);
      if (!isEmailValid) {
        return;
      }
    }

    setIsRequestingOtp(true);
    setAuthFeedback(null);

    const channel = authMode;
    const contact = channel === "email" ? email.trim().toLowerCase() : phoneDigits;

    try {
      const response = await fetch(`${backendApiBase}/api/buyers/otp/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel,
          contact,
          subscribeNewsletter: isSubscribed,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        data?: {
          channel?: "phone" | "email";
          contact?: string;
          devOtp?: string;
        };
      } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Unable to send OTP right now. Please try again.");
      }

      const payloadContact = payload?.data?.contact || contact;
      const payloadChannel = payload?.data?.channel || channel;

      setOtpSession({
        channel: payloadChannel,
        contact: payloadContact,
      });
      setOtpCode(payload?.data?.devOtp || "");
      setIsOtpTouched(false);
      setProfileName((previous) => previous || deriveNameFromContact(payloadContact));
      setProfileEmail((previous) => {
        if (previous) {
          return previous;
        }

        return payloadChannel === "email" ? payloadContact : "";
      });

      setAuthFeedback({
        type: "success",
        message: payload.message || "OTP sent successfully.",
      });
    } catch (error) {
      setAuthFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send OTP right now. Please try again.",
      });
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleOtpVerify = async () => {
    if (!otpSession) {
      return;
    }

    setIsOtpTouched(true);
    setIsProfileNameTouched(true);
    setIsProfileEmailTouched(true);

    if (!isOtpValid || !isProfileNameValid || !isProfileEmailValid) {
      return;
    }

    setIsVerifyingOtp(true);
    setAuthFeedback(null);

    try {
      const response = await fetch(`${backendApiBase}/api/buyers/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: otpSession.channel,
          contact: otpSession.contact,
          otp: otpCode.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Unable to verify OTP right now. Please try again.");
      }

      const nextProfile: AuthProfile = {
        name: profileName.trim(),
        email: profileEmail.trim().toLowerCase(),
        channel: otpSession.channel,
        contact: otpSession.contact,
      };

      setAuthProfile(nextProfile);
      setIsAuthModalOpen(false);
    } catch (error) {
      setAuthFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to verify OTP right now. Please try again.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <>
      <nav className="px-4 py-4 pr-3">
        <ul className="space-y-1 text-[15px] text-[var(--foreground)]">
          {items.map((item) => {
            const subItems = expandableItems[item.label];
            const isExpandable = Boolean(subItems);
            const isOpen = openSection === item.label;

            if (item.label === "Sign In / Register" && authProfile) {
              return (
                <li key={item.label}>
                  <div className="rounded-lg border border-black/10 bg-white px-3 py-3">
                    <p className="text-[0.84rem] font-semibold uppercase tracking-[0.08em] text-[#596170]">Signed In</p>
                    <p className="mt-1 text-[1rem] font-semibold text-[#212227]">{authProfile.name}</p>
                    <p className="mt-0.5 break-all text-[0.9rem] text-[#5f6673]">{authProfile.email}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthProfile(null);
                        setIsAuthModalOpen(true);
                      }}
                      className="mt-3 w-full rounded-md border border-[#d7d7d7] bg-white px-3 py-2 text-[0.92rem] font-semibold text-[#4f5662] transition hover:bg-[#f8f8f8]"
                    >
                      Sign Out And Use Another Account
                    </button>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={isExpandable ? isOpen : undefined}
                  onClick={() => {
                    if (item.label === "Sign In / Register") {
                      setIsAuthModalOpen(true);
                      return;
                    }

                    if (isExpandable) {
                      setActiveMegaMenu(null);
                      setOpenSection((previous) => (previous === item.label ? null : item.label));
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-4 text-left transition hover:bg-black/[0.03] ${
                    item.dividerBefore ? "mt-2 border-t border-[var(--border)] pt-5" : ""
                  }`}
                >
                  <span
                    className={
                      item.strong
                        ? "text-lg font-semibold"
                        : item.emphasis
                          ? "font-semibold"
                          : "font-medium"
                    }
                  >
                    {item.label}
                  </span>
                  {item.hasChildren ? (
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-[var(--muted)]">
                      <path
                        d={isOpen ? "M5 12.5 10 7.5 15 12.5" : "M5 7.5 10 12.5 15 7.5"}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>

                {isExpandable ? (
                  <div className={`-mt-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-1 pb-3 pl-8 pr-2">
                      {subItems.map((subItem) => {
                        const isActiveSubItem =
                          (item.label === "Women" && subItem === "Clothing" && activeMegaMenu === "women-clothing") ||
                          (item.label === "Women" && subItem === "Accessories" && activeMegaMenu === "women-accessories") ||
                          (item.label === "Women" && subItem === "Footwear" && activeMegaMenu === "women-footwear") ||
                          (item.label === "Women" && subItem === "Lingerie and Sleepwear" && activeMegaMenu === "women-lingerie") ||
                          (item.label === "Men" && subItem === "Clothing" && activeMegaMenu === "men-clothing") ||
                          (item.label === "Men" && subItem === "Footwear" && activeMegaMenu === "men-footwear") ||
                          (item.label === "Men" && subItem === "Accessories" && activeMegaMenu === "men-accessories") ||
                          (item.label === "Men" && subItem === "Inner and Sleepwear" && activeMegaMenu === "men-inner") ||
                          (item.label === "Beauty" && subItem === "Hair Care" && activeMegaMenu === "beauty-hair-care") ||
                          (item.label === "Beauty" && subItem === "Bath & Body" && activeMegaMenu === "beauty-bath-body") ||
                          (item.label === "Beauty" && subItem === "Makeup" && activeMegaMenu === "beauty-makeup") ||
                          (item.label === "Beauty" && subItem === "Skincare" && activeMegaMenu === "beauty-skincare") ||
                          (item.label === "Beauty" && subItem === "Fragrance" && activeMegaMenu === "beauty-fragrance") ||
                          (item.label === "Kids" && subItem === "Girl" && activeMegaMenu === "kids-girl") ||
                          (item.label === "Kids" && subItem === "Boy" && activeMegaMenu === "kids-boy") ||
                          (item.label === "Kids" && subItem === "Boy Newborn" && activeMegaMenu === "kids-boy-newborn") ||
                          (item.label === "Kids" && subItem === "Girl Newborn" && activeMegaMenu === "kids-girl-newborn");

                        return (
                          <li key={subItem}>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.label === "Women" && subItem === "Clothing") {
                                  setActiveMegaMenu((previous) => (previous === "women-clothing" ? null : "women-clothing"));
                                  return;
                                }

                                if (item.label === "Women" && subItem === "Accessories") {
                                  setActiveMegaMenu((previous) => (previous === "women-accessories" ? null : "women-accessories"));
                                  return;
                                }

                                if (item.label === "Women" && subItem === "Footwear") {
                                  setActiveMegaMenu((previous) => (previous === "women-footwear" ? null : "women-footwear"));
                                  return;
                                }

                                if (item.label === "Women" && subItem === "Lingerie and Sleepwear") {
                                  setActiveMegaMenu((previous) => (previous === "women-lingerie" ? null : "women-lingerie"));
                                  return;
                                }

                                if (item.label === "Men" && subItem === "Clothing") {
                                  setActiveMegaMenu((previous) => (previous === "men-clothing" ? null : "men-clothing"));
                                  return;
                                }

                                if (item.label === "Men" && subItem === "Footwear") {
                                  setActiveMegaMenu((previous) => (previous === "men-footwear" ? null : "men-footwear"));
                                  return;
                                }

                                if (item.label === "Men" && subItem === "Accessories") {
                                  setActiveMegaMenu((previous) => (previous === "men-accessories" ? null : "men-accessories"));
                                  return;
                                }

                                if (item.label === "Men" && subItem === "Inner and Sleepwear") {
                                  setActiveMegaMenu((previous) => (previous === "men-inner" ? null : "men-inner"));
                                  return;
                                }

                                if (item.label === "Beauty" && subItem === "Hair Care") {
                                  setActiveMegaMenu((previous) => (previous === "beauty-hair-care" ? null : "beauty-hair-care"));
                                  return;
                                }

                                if (item.label === "Beauty" && subItem === "Bath & Body") {
                                  setActiveMegaMenu((previous) => (previous === "beauty-bath-body" ? null : "beauty-bath-body"));
                                  return;
                                }

                                if (item.label === "Beauty" && subItem === "Makeup") {
                                  setActiveMegaMenu((previous) => (previous === "beauty-makeup" ? null : "beauty-makeup"));
                                  return;
                                }

                                if (item.label === "Beauty" && subItem === "Skincare") {
                                  setActiveMegaMenu((previous) => (previous === "beauty-skincare" ? null : "beauty-skincare"));
                                  return;
                                }

                                if (item.label === "Beauty" && subItem === "Fragrance") {
                                  setActiveMegaMenu((previous) => (previous === "beauty-fragrance" ? null : "beauty-fragrance"));
                                  return;
                                }

                                if (item.label === "Kids" && subItem === "Girl") {
                                  setActiveMegaMenu((previous) => (previous === "kids-girl" ? null : "kids-girl"));
                                  return;
                                }

                                if (item.label === "Kids" && subItem === "Boy") {
                                  setActiveMegaMenu((previous) => (previous === "kids-boy" ? null : "kids-boy"));
                                  return;
                                }

                                if (item.label === "Kids" && subItem === "Boy Newborn") {
                                  setActiveMegaMenu((previous) => (previous === "kids-boy-newborn" ? null : "kids-boy-newborn"));
                                  return;
                                }

                                if (item.label === "Kids" && subItem === "Girl Newborn") {
                                  setActiveMegaMenu((previous) => (previous === "kids-girl-newborn" ? null : "kids-girl-newborn"));
                                  return;
                                }

                                setActiveMegaMenu(null);
                              }}
                              className={`w-full rounded-md px-1 py-1.5 text-left text-[1rem] leading-snug transition hover:bg-black/[0.03] ${
                                isActiveSubItem ? "bg-black/[0.06] font-semibold" : "text-[var(--foreground)]"
                              }`}
                            >
                              {subItem}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      {shouldShowMegaMenu ? (
        <>
          <button
            type="button"
            aria-label="Close clothing panel"
            className="fixed bottom-0 right-0 top-[112px] z-[55] w-[calc(100vw-280px)] bg-black/35"
            onClick={() => setActiveMegaMenu(null)}
          />

          <div className="fixed left-[280px] top-[112px] z-[60]">
            <ClothingMegaPanel
              title={megaMenuData.title}
              items={megaMenuData.items}
              sectionRows={megaMenuData.sectionRows}
              defaultOpenSectionTitle={"defaultOpenSectionTitle" in megaMenuData ? megaMenuData.defaultOpenSectionTitle : null}
            />
          </div>
        </>
      ) : null}

      {isAuthModalOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 py-6" onClick={() => setIsAuthModalOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sign up or log in"
            className="relative flex max-h-[90vh] w-full max-w-[min(92vw,600px)] flex-col overflow-hidden rounded-[12px] bg-white px-5 pb-6 pt-5 shadow-[0_24px_50px_rgba(0,0,0,0.28)] sm:px-8 sm:pb-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-[#5f5f5f] transition hover:bg-black/5"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path d="M6 6 18 18M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="border-b border-black/10 pb-4">
              <div className="flex items-center justify-center gap-3">
                <Image src="/assets/logo/logo1.webp" alt="TRT logo" width={30} height={30} className="h-[30px] w-[30px] rounded-full object-cover" />
                <div className="leading-none">
                  <p className="text-[2rem] font-light tracking-[0.16em] text-[#202124]">TRT</p>
                  <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#777]">Traditional Wear</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              <h3 className="mt-6 text-[1.55rem] font-semibold leading-none text-[#1f2022]">Sign up or log in</h3>

              <form
                className="mt-5"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (otpSession) {
                    await handleOtpVerify();
                    return;
                  }

                  await handleOtpRequest();
                }}
              >
                {!otpSession && authMode === "phone" ? (
                  <>
                    <label htmlFor="phone" className="mb-2 block text-[1rem] font-medium text-[#565656]">
                      Phone Number
                    </label>

                    <div className={`flex overflow-hidden rounded-[10px] border ${showPhoneError ? "border-[#f2a2a2]" : "border-[#d8d8d8]"}`}>
                      <span className="flex items-center border-r border-[#e2e2e2] bg-[#f8f8f8] px-4 text-[0.98rem] text-[#4e4e4e]">PK</span>
                      <input
                        id="phone"
                        inputMode="numeric"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        onBlur={() => setIsPhoneTouched(true)}
                        placeholder="3xxxxxxxxx"
                        className="w-full px-4 py-3 text-[1rem] text-[#2c2c2c] outline-none placeholder:text-[#9a9a9a]"
                      />
                    </div>

                    {showPhoneError ? <p className="mt-2 text-[0.98rem] font-medium text-[#ef5446]">Please enter a valid Phone number.</p> : null}
                  </>
                ) : null}

                {!otpSession && authMode === "email" ? (
                  <>
                    <label htmlFor="email" className="mb-2 block text-[1rem] font-medium text-[#565656]">
                      Email Address
                    </label>

                    <div className={`overflow-hidden rounded-[10px] border ${showEmailError ? "border-[#f2a2a2]" : "border-[#d8d8d8]"}`}>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={() => setIsEmailTouched(true)}
                        placeholder="Enter your Email address"
                        className="w-full px-4 py-3 text-[1rem] text-[#2c2c2c] outline-none placeholder:text-[#9a9a9a]"
                      />
                    </div>

                    {showEmailError ? <p className="mt-2 text-[0.98rem] font-medium text-[#ef5446]">Please enter a valid email address.</p> : null}
                  </>
                ) : null}

                {otpSession ? (
                  <>
                    <p className="mb-2 text-[0.95rem] text-[#555]">
                      Enter OTP sent to {otpSession.channel === "email" ? otpSession.contact : `+92${otpSession.contact}`}.
                    </p>

                    <label htmlFor="otp-code" className="mb-2 block text-[1rem] font-medium text-[#565656]">
                      OTP Code
                    </label>

                    <div className={`overflow-hidden rounded-[10px] border ${showOtpError ? "border-[#f2a2a2]" : "border-[#d8d8d8]"}`}>
                      <input
                        id="otp-code"
                        inputMode="numeric"
                        value={otpCode}
                        onChange={(event) => setOtpCode(event.target.value)}
                        onBlur={() => setIsOtpTouched(true)}
                        placeholder="Enter OTP"
                        className="w-full px-4 py-3 text-[1rem] text-[#2c2c2c] outline-none placeholder:text-[#9a9a9a]"
                      />
                    </div>

                    {showOtpError ? <p className="mt-2 text-[0.98rem] font-medium text-[#ef5446]">Please enter a valid OTP.</p> : null}

                    <label htmlFor="profile-name" className="mb-2 mt-4 block text-[1rem] font-medium text-[#565656]">
                      Full Name
                    </label>

                    <div className={`overflow-hidden rounded-[10px] border ${showProfileNameError ? "border-[#f2a2a2]" : "border-[#d8d8d8]"}`}>
                      <input
                        id="profile-name"
                        value={profileName}
                        onChange={(event) => setProfileName(event.target.value)}
                        onBlur={() => setIsProfileNameTouched(true)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 text-[1rem] text-[#2c2c2c] outline-none placeholder:text-[#9a9a9a]"
                      />
                    </div>

                    {showProfileNameError ? <p className="mt-2 text-[0.98rem] font-medium text-[#ef5446]">Please enter your name.</p> : null}

                    <label htmlFor="profile-email" className="mb-2 mt-4 block text-[1rem] font-medium text-[#565656]">
                      Email Address
                    </label>

                    <div className={`overflow-hidden rounded-[10px] border ${showProfileEmailError ? "border-[#f2a2a2]" : "border-[#d8d8d8]"}`}>
                      <input
                        id="profile-email"
                        type="email"
                        value={profileEmail}
                        onChange={(event) => setProfileEmail(event.target.value)}
                        onBlur={() => setIsProfileEmailTouched(true)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 text-[1rem] text-[#2c2c2c] outline-none placeholder:text-[#9a9a9a]"
                      />
                    </div>

                    {showProfileEmailError ? <p className="mt-2 text-[0.98rem] font-medium text-[#ef5446]">Please enter a valid email address.</p> : null}
                  </>
                ) : null}

                {!otpSession ? (
                  <label className="mt-4 flex items-center gap-3 text-[1rem] text-[#4d4d4d]">
                    <input
                      type="checkbox"
                      checked={isSubscribed}
                      onChange={(event) => setIsSubscribed(event.target.checked)}
                      className="h-5 w-5 rounded border-black/20 accent-[#4b4b4b]"
                    />
                    Subscribe to our newsletter
                  </label>
                ) : null}

                <button
                  type="submit"
                  disabled={isRequestingOtp || isVerifyingOtp}
                  className="mt-5 w-full rounded-[10px] bg-[#26272b] px-5 py-[11px] text-[1.08rem] font-semibold text-white transition hover:bg-[#1f2023] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {otpSession
                    ? isVerifyingOtp
                      ? "Verifying OTP..."
                      : "Verify OTP"
                    : isRequestingOtp
                      ? "Sending OTP..."
                      : "Request OTP"}
                </button>

                {authFeedback ? (
                  <p
                    className={`mt-3 text-[0.95rem] font-medium ${
                      authFeedback.type === "success" ? "text-[#1d7d42]" : "text-[#d43b3b]"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {authFeedback.message}
                  </p>
                ) : null}

                {!otpSession ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode((previous) => (previous === "phone" ? "email" : "phone"));
                      setIsPhoneTouched(false);
                      setIsEmailTouched(false);
                      setAuthFeedback(null);
                    }}
                    className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#d7d7d7] bg-white px-5 py-[11px] text-[1.08rem] font-semibold text-[#5a5a5a] transition hover:bg-[#fafafa]"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      {authMode === "phone" ? (
                        <>
                          <path d="M3 6.5h18v11H3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                          <path d="m4.5 8 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      ) : (
                        <>
                          <path d="M8 3.5h8v17H8z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M10 18h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </>
                      )}
                    </svg>
                    {authMode === "phone" ? "Continue With Email" : "Continue With Phone"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSession(null);
                      setOtpCode("");
                      setIsOtpTouched(false);
                      setAuthFeedback(null);
                    }}
                    className="mt-3.5 w-full rounded-[10px] border border-[#d7d7d7] bg-white px-5 py-[11px] text-[1.08rem] font-semibold text-[#5a5a5a] transition hover:bg-[#fafafa]"
                  >
                    Change Phone/Email
                  </button>
                )}
              </form>
            </div>

            <p className="mx-auto mt-6 max-w-[90%] text-center text-[0.92rem] leading-snug text-[#666]">
              By signing in, I confirm that I have reviewed the <a href="#" className="!font-semibold !text-[#0f62fe] !no-underline hover:!text-[#0047b3]">Privacy policy</a> and <a href="#" className="!font-semibold !text-[#0f62fe] !no-underline hover:!text-[#0047b3]">Terms of service</a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}