import { Card } from "@/components/ui/card";
import getData from "@/lib/getData";
import UserData from "@/types/userData";
import { redirect } from "next/navigation";
import { UpdateName, UpdatePassword, UpdateUsername } from "./settings-comp";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function UserSettingsPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = await params;
  const resultUser = await getData<UserData>("/api/user-data");
  if (user !== resultUser.data.data.userData.username)
    redirect("/login?message=Unauthorized!");

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="px-8 items-center">
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
