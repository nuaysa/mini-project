"use client"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastErr } from "@/helpers/toast";
import { useEffect } from "react";

const base_url = process.env.NEXT_PUBLIC_BASE_BE;

export default function verifyPage({ params }: { params: { token: string } }) {
    const router = useRouter();
    const onVerify = async () => {
        try {
            const res = await fetch(`${base_url}/auth/verify/${params.token}`, {
                method: "PATCH",
            });
            const result = await res.json();
            if (!res.ok) throw result;
            toast.success(result.message);
            router.push("/login");
        } catch (err) {
            toastErr(err);
            router.push("/")
            
        }
    };

    useEffect(() => {
        onVerify();
    }, []);
    
}