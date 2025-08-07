import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/login")
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Libero laboriosam omnis quisquam soluta harum labore maiores at
        reprehenderit quibusdam corporis fugit, culpa consectetur, vitae
        blanditiis quod quidem eaque. Sed, unde!
      </div>
    </div>
  );
}
