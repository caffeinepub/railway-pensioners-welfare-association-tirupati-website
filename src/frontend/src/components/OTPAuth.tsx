import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useCreateOTP, useVerifyOTP } from "@/hooks/useQueries";
import { Loader2, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MobileFormData {
  mobileNumber: string;
}

interface OTPAuthProps {
  onAuthSuccess: () => void;
}

export default function OTPAuth({ onAuthSuccess }: OTPAuthProps) {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MobileFormData>();
  const createOTP = useCreateOTP();
  const verifyOTP = useVerifyOTP();

  const onMobileSubmit = async (data: MobileFormData) => {
    try {
      const otpCode = await createOTP.mutateAsync(data.mobileNumber);
      setMobileNumber(data.mobileNumber);
      setGeneratedOTP(otpCode);
      setStep("otp");
      toast.success(`OTP sent to ${data.mobileNumber}. For demo: ${otpCode}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to generate OTP");
    }
  };

  const onOTPSubmit = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const isValid = await verifyOTP.mutateAsync({
        mobileNumber,
        otp,
      });

      if (isValid) {
        toast.success("Mobile number verified successfully!");
        onAuthSuccess();
      } else {
        toast.error("Invalid OTP. Please try again.");
        setOtp("");
      }
    } catch (error: any) {
      toast.error(error.message || "OTP verification failed");
      setOtp("");
    }
  };

  const handleResendOTP = async () => {
    try {
      const otpCode = await createOTP.mutateAsync(mobileNumber);
      setGeneratedOTP(otpCode);
      setOtp("");
      toast.success(`New OTP sent to ${mobileNumber}. For demo: ${otpCode}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Smartphone className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">
          {step === "mobile" ? "Mobile Verification" : "Enter OTP"}
        </CardTitle>
        <CardDescription className="text-center">
          {step === "mobile"
            ? "Enter your mobile number to receive a one-time password"
            : `We've sent a 6-digit OTP to ${mobileNumber}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "mobile" ? (
          <form onSubmit={handleSubmit(onMobileSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-destructive">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  <p className="font-medium mb-1">Secure Authentication</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Your mobile number will be verified with a one-time password
                    for secure access to booking features.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={createOTP.isPending}
            >
              {createOTP.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-center block">Enter 6-Digit OTP</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {generatedOTP && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <span className="font-medium">Demo Mode:</span> Your OTP is{" "}
                  <span className="font-bold text-lg">{generatedOTP}</span>
                </p>
              </div>
            )}

            <Button
              onClick={onOTPSubmit}
              className="w-full"
              size="lg"
              disabled={verifyOTP.isPending || otp.length !== 6}
            >
              {verifyOTP.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <div className="text-center space-y-2">
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={createOTP.isPending}
                className="text-sm"
              >
                {createOTP.isPending ? "Sending..." : "Resend OTP"}
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  setStep("mobile");
                  setOtp("");
                  setMobileNumber("");
                }}
                className="text-sm block w-full"
              >
                Change Mobile Number
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
