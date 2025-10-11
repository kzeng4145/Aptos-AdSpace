import { isSignedIn } from "@/echo";

export function UserBalance() {
  if (!isSignedIn()) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
        <span className="text-sm font-medium text-white">
          Echo User
        </span>
      </div>
    </div>
  );
}
