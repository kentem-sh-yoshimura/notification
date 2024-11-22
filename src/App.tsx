import { useEffect, useState } from "react";
import "./App.css";

const PERMISSION: Record<typeof Notification.permission, string> = {
  granted: "許可",
  denied: "拒否",
  default: "初期",
};

const App = () => {
  const [permission, setPermission] =
    useState<typeof Notification.permission>("default");
  const [message, setMessage] = useState<string | undefined>(undefined);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
    switch (permission) {
      case "granted":
        setMessage("許可してくれてありがとう😁");
        return;
      case "denied":
        setMessage("拒否すんなよ👹");
        return;
      case "default":
        setMessage("無視すんなよ🤬");
        return;
    }
  };

  const sendNotification = () => {
    const notification = new Notification("こんにちは", {
      body: "お元気ですか？",
      icon: `${window.location.href}/sample.png`,
    });

    notification.onclick = () => window.open();

    setTimeout(notification.close.bind(notification), 5000);
  };

  useEffect(() => {
    setPermission(Notification.permission);
    requestPermission();
  }, []);

  return (
    <main>
      <div className="v-flex">
        <span>{`現在の状態: ${PERMISSION[permission]}`}</span>
        <button onClick={requestPermission}>通知許可を求める</button>
        {message && <span>{message}</span>}
        <button onClick={sendNotification} disabled={permission !== "granted"}>
          通知する
        </button>
      </div>
    </main>
  );
};

export default App;
