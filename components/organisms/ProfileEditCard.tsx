"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfileEditCard() {
    return (
        <Card className="w-full max-w-xl bg-card text-card-foreground border-gray-300/20">
            
            <CardContent className="space-y-6">

                {/* USERNAME */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="username" className=" text-gray-400 text-sm">Username</Label>
                    <Input
                        id="username"
                        defaultValue=""
                        className="bg-background border-gray-300/20"
                    />
                </div>

                {/* BIO */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="bio" className="text-gray-400 text-sm">Bio</Label>
                    <Textarea
                        id="bio"
                        defaultValue=""
                        className="bg-background  border-gray-300/20 resize-none h-32"
                    />
                </div>
            </CardContent>

            <CardFooter className="flex gap-3">
                <Button className="rounded-md bg-blue-500 hover:bg-blue-600">
                    Salva
                </Button>

                <Button className="rounded-md bg-gray-700 hover:bg-gray-800">
                    Annulla
                </Button>
            </CardFooter>
        </Card>
    );
}
