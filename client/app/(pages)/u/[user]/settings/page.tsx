import { Card, CardTitle } from "@/components/ui/card";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { redirect } from "next/navigation";
import { UpdateName, UpdatePassword, UpdateUsername } from "../_components/settings-comp";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function UserSettingsPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  const resultUser = await getData<UserData>("/api/user-data");
  if (user !== resultUser.data.data.userData.username)
    redirect("/login?message=Unauthorized!");

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="px-8 items-center">
        <CardTitle className="self-center text-lg">
          User Settings
        </CardTitle>
        <Avatar className="w-35 h-35">
          <AvatarImage src={resultUser.data.data.userData.avatar} alt="User Image"/>
        </Avatar>
        <div className="flex flex-col gap-2">
          <UpdateName name={resultUser.data.data.userData.name} />
          <UpdateUsername username={resultUser.data.data.userData.username} />
          <UpdatePassword />
        </div>
      </Card>
    </div>
  );
}
