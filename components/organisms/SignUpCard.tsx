"use client";

import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignUpCard({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        if (form.password !== form.confirm) {
            alert("Le password non coincidono");
            return;
        }
        onSubmit(form);
    }

    return (
        <Card className="w-full max-w-md bg-card text-card-foreground border-gray-300/20">
            <CardHeader className="text-center">
                <CardTitle className="font-bold text-2xl">Crea un account</CardTitle>
                <CardDescription>Inserisci i tuoi dati per registrarti</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label>Username</Label>
                        <Input id="username" type="text" placeholder="username" className="bg-background border-gray-300/20"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input id="email" type="email" placeholder="nome@esempio.com" className="bg-background border-gray-300/20"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-background border-gray-300/20"
                            value={form.password}
                            minLength={8}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Conferma Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-background border-gray-300/20"
                            minLength={8}
                            value={form.confirm}
                            onChange={(e) =>
                                setForm({ ...form, confirm: e.target.value })
                            }
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600">
                        Crea account
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
                <div className="text-center">
                    <CardDescription className="py-0">
                        Hai già un account?
                        <a href="/login"
                            className="px-1 inline-block text-sm underline-offset-4 hover:underline font-bold text-blue-500"
                        >
                            Accedi
                        </a>
                    </CardDescription>
                </div>
            </CardFooter>
        </Card>
    );
}
