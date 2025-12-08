// app/profile/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

type TabKey = "profile" | "settings";

export default function ProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<TabKey>("profile");
    const [openLogout, setOpenLogout] = React.useState(false);

    const user = {
        name: "Your name",
        email: "yourname@gmail.com",
        followers: 5,
        following: 100,
        location: "Indonesia",
        phone: "",
    };

    function handleLogoutClick() {
        setOpenLogout(true);
    }

    function handleConfirmLogout() {
        setOpenLogout(false);

        // bersihin data login kalau suatu saat ada yang disimpan
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // optional: kalau ada cookie custom di masa depan
        // document.cookie = "token=; Max-Age=0; path=/";

        router.push("/login");
        router.refresh();
    }


    return (
        <main className="min-h-screen px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">

                {/* LEFT SIDEBAR */}
                <div className="md:sticky md:top-24 h-fit">
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg">
                                    👤
                                </div>
                                <div>
                                    <p className="font-semibold leading-tight">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>

                            <div className="border-t pt-3 space-y-1 text-sm">
                                <SidebarItem
                                    active={activeTab === "profile"}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    My Profile
                                </SidebarItem>

                                <SidebarItem
                                    active={activeTab === "settings"}
                                    onClick={() => setActiveTab("settings")}
                                >
                                    Settings
                                </SidebarItem>

                                {/* Log out merah + tebal */}
                                <SidebarItem
                                    active={false}
                                    onClick={handleLogoutClick}
                                    danger
                                >
                                    Log Out
                                </SidebarItem>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT CONTENT */}
                {activeTab === "profile" ? (
                    <ProfilePanel user={user} />
                ) : (
                    <SettingsPanel />
                )}
            </div>

            {/* MODAL KONFIRMASI LOGOUT */}
            <Modal open={openLogout} onClose={() => setOpenLogout(false)}>
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardContent className="py-8 space-y-4 text-center">
                <h2 className="text-xl font-semibold">Logout?</h2>
                <p className="text-sm text-muted-foreground">
                    Kamu yakin mau keluar dari Finovate?
                </p>

                <div className="flex justify-center gap-3 pt-2">
                    <Button variant="outline" onClick={() => setOpenLogout(false)}>
                    Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirmLogout}>
                    Yes, Logout
                    </Button>
                </div>
                </CardContent>
            </Card>
            </Modal>
        </main>
    );
}

/* ---------- Sidebar Item ---------- */
function SidebarItem({
    children,
    active,
    onClick,
    danger,
}: {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition",
                active ? "bg-muted font-semibold" : "hover:bg-muted/60",
                danger ? "text-destructive font-semibold hover:bg-destructive/10" : "",
            ].join(" ")}
        >
            <span>{children}</span>
            <span className="text-muted-foreground">›</span>
        </button>
    );
}

/* ---------- Profile Panel ---------- */
function ProfilePanel({ user }: { user: any }) {
    return (
        <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Profile</CardTitle>

                <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                        <p className="text-muted-foreground">Following</p>
                        <p className="font-semibold">{user.following}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-muted-foreground">Followers</p>
                        <p className="font-semibold">{user.followers}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="flex items-center gap-4 pb-2">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl">
                        👤
                    </div>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Row label="Name">
                    <Input defaultValue={user.name} placeholder="Your name" />
                </Row>

                <Row label="Email account">
                    <Input defaultValue={user.email} placeholder="you@email.com" />
                </Row>

                <Row label="Phone number">
                    <Input defaultValue={user.phone} placeholder="Add number" />
                </Row>

                <Row label="Location">
                    <Input defaultValue={user.location} placeholder="Location" />
                </Row>

                <div className="pt-4">
                    <Button className="rounded-full px-8">Save changes</Button>
                </div>
            </CardContent>
        </Card>
    );
}

/* ---------- Settings Panel ---------- */
function SettingsPanel() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle className="text-xl">Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <SettingsRow label="Theme">
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                    </select>
                </SettingsRow>

                <SettingsRow label="Language">
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Eng</option>
                        <option>Ind</option>
                    </select>
                </SettingsRow>

                <SettingsRow label="Privacy">
                    <button className="text-sm text-primary hover:underline">
                        Manage privacy
                    </button>
                </SettingsRow>
            </CardContent>
        </Card>
    );
}

/* ---------- helpers ---------- */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3">
            <label className="text-sm text-muted-foreground">{label}</label>
            {children}
        </div>
    );
}

function SettingsRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-3 border-b pb-4 last:border-b-0 last:pb-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="justify-self-start md:justify-self-end">{children}</div>
        </div>
    );
}
