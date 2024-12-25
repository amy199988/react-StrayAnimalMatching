import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { checkSession } from "../services/authService"; // 用來檢查 session 是否有效的函數

const ProtectedRoute = ({ allowedRoles }) => {
    const navigate = useNavigate();

    const userDtoString = localStorage.getItem("userDto");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // 使用 useRef 來防止副作用執行兩次
    const effectExecuted = useRef(false);

    useEffect(() => {
        // 防止在 Strict Mode 下重複執行
        if (effectExecuted.current) return;
        effectExecuted.current = true;

        // 檢查登入狀態
        if (!isLoggedIn || !userDtoString) {
            message.error("請先登入");
            setTimeout(() => {
                navigate("/auth/login");
            }, 3000);
            return;
        }

        // 檢查 session 是否有效
        const checkUserSession = async () => {
            try {
                const sessionValid = await checkSession(); // 假設 checkSession() 返回一個布林值，表示 session 是否有效
                if (!sessionValid) {
                    message.error("請重新登入");
                    localStorage.setItem("isLoggedIn", "false"); // 清除登入狀態
                    setTimeout(() => {
                        navigate("/auth/login");
                    }, 3000);
                } else {
                    // 檢查角色
                    const userDto = JSON.parse(userDtoString);
                    const userRole = userDto.role;

                    if (!allowedRoles.includes(userRole)) {
                        message.error("無訪問權限");
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    }
                }
            } catch (error) {
                console.error("Session 檢查失敗:", error);
                message.error("請重新登入");
                setTimeout(() => {
                    navigate("/auth/login");
                }, 3000);
            }
        };

        checkUserSession();
    }, [navigate, allowedRoles, isLoggedIn, userDtoString]);

    if (!isLoggedIn || !userDtoString) {
        return null;
    }

    const userDto = JSON.parse(userDtoString);
    const userRole = userDto.role;

    if (!allowedRoles.includes(userRole)) {
        return null;
    }

    return <Outlet />;
};


export default ProtectedRoute;