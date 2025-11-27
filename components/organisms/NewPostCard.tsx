"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewPostCard() {
    return (
        <Card className="w-full max-w-xl bg-card text-card-foreground border-gray-300/20">
            
            {/* -- FORM -- */}
            <CardContent className="space-y-6">
                <div className="flex flex-col gap-2">
                    <Textarea
                        id="content"
                        placeholder="Cosa stai pensando?"
                        defaultValue=""
                        className="bg-background border-gray-300/20 resize-none h-32"
                    />
                </div>
            </CardContent>

            <CardFooter className="flex gap-3 justify-between">
                <p className="text-sm text-gray-400">Supporta Markdown: **grassetto**, _corsivo_, liste, ecc.</p>

                <Button className="rounded-md bg-blue-500 hover:bg-blue-600">
                    Pubblica
                </Button>
            </CardFooter>
        </Card>
    );
}
