import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { lineData } from "../../services/lineService";
import { Spin } from "antd";

const LineLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [spinning, setSpinning] = React.useState(false);
  const [percent, setPercent] = React.useState(0);

  useEffect(() => {
    const code = searchParams.get("code"); // 從回調 URL 中獲取 code
    const state = searchParams.get("state");

    const loadDatas = async () => {
      try {
        showLoader();
        // 從 sessionStorage 中取出 lineLoginState
        const lineLoginState = JSON.parse(sessionStorage.getItem("lineLoginState"));

        if (!lineLoginState || lineLoginState.state !== state) {
          throw new Error("狀態驗證失敗！");
        }

        const line = {
          code: code,
          state: state,
          userId: lineLoginState.userId,
        }
        await lineData(line);
        
        navigate("/");
      } catch (error) {
        console.error("Error fetching lineData", error);
        navigate("/");
      }
    };

    loadDatas();
  }, [searchParams, navigate]);

  const showLoader = () => {
    setSpinning(true);
    let ptg = 0;
    const interval = setInterval(() => {
      ptg += 10;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };

  return (
    <Spin
      spinning={spinning}
      tip={`Loading... ${percent}%`}
      percent={percent}
      fullscreen
    />
  );
};
export default LineLogin;
