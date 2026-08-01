import { createFileRoute } from "@tanstack/react-router";
import { debugAuth, insertDentist } from "./api/debug-auth";
import { lookupAccountFn, setPasswordFn, loginFn } from "../lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");

  if (!authed) {
    return (
      <div style={{ padding: 40, fontFamily: "monospace", background: "#111", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={e => { e.preventDefault(); if (pw === "gdndebug2026") setAuthed(true); else alert("Wrong password"); }} style={{ textAlign: "center" }}>
          <h1>🔐 Debug Access</h1>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" style={{ padding: 8, fontSize: 16, width: 250 }} autoFocus />
          <button type="submit" style={{ padding: 8, marginLeft: 8, fontSize: 16 }}>Unlock</button>
        </form>
      </div>
    );
  }

  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [insertEmail, setInsertEmail] = useState("");
  const [insertName, setInsertName] = useState("");
  const [insertResult, setInsertResult] = useState<any>(null);

  return (
    <div style={{ padding: 40, fontFamily: "monospace", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1>🔧 DB Debug</h1>
      
      <div style={{ marginBottom: 30 }}>
        <h2>Lookup Dentist</h2>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 8, width: 300 }} />
        <button onClick={async () => { setResult(await debugAuth({ data: { email } })); }} style={{ padding: 8, marginLeft: 8 }}>Query</button>
        {result && <pre style={{ marginTop: 10, background: "#222", padding: 10 }}>{JSON.stringify(result, null, 2)}</pre>}
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2>Test Login Flow</h2>
        <input placeholder="email" id="testEmail" style={{ padding: 8, width: 300 }} />
        <input placeholder="password" id="testPass" type="password" style={{ padding: 8, width: 200, marginLeft: 8 }} />
        <button onClick={async () => {
          const em = (document.getElementById("testEmail") as HTMLInputElement).value;
          const pw = (document.getElementById("testPass") as HTMLInputElement).value;
          setResult(null);
          try {
            const lookup = await lookupAccountFn({ data: { email: em } });
            if (!lookup.found) {
              setResult({ lookupError: "Account not found", lookup });
              return;
            }
            const setRes = await setPasswordFn({
              data: { dentistId: lookup.dentistId, password: pw, accountType: lookup.accountType },
            });
            setResult({ lookup, setPasswordResult: setRes });
          } catch(e: any) {
            setResult({ error: e.message || String(e), stack: e.stack });
          }
        }} style={{ padding: 8, marginLeft: 8 }}>Lookup + Set Password</button>
        <button onClick={async () => {
          const em = (document.getElementById("testEmail") as HTMLInputElement).value;
          const pw = (document.getElementById("testPass") as HTMLInputElement).value;
          setResult(null);
          try {
            const res = await loginFn({ data: { email: em, password: pw } });
            setResult({ loginResult: res });
          } catch(e: any) {
            setResult({ error: e.message || String(e), stack: e.stack });
          }
        }} style={{ padding: 8, marginLeft: 8 }}>Test Login</button>
        {result && <pre style={{ marginTop: 10, background: "#222", padding: 10 }}>{JSON.stringify(result, null, 2)}</pre>}
      </div>

      <div>
        <h2>Insert Dentist</h2>
        <input placeholder="email" value={insertEmail} onChange={e => setInsertEmail(e.target.value)} style={{ padding: 8, width: 300, display: "block", marginBottom: 8 }} />
        <input placeholder="practice name" value={insertName} onChange={e => setInsertName(e.target.value)} style={{ padding: 8, width: 300, display: "block", marginBottom: 8 }} />
        <button onClick={async () => { setInsertResult(await insertDentist({ data: { email: insertEmail, practiceName: insertName } })); }} style={{ padding: 8 }}>Insert</button>
        {insertResult && <pre style={{ marginTop: 10, background: "#222", padding: 10 }}>{JSON.stringify(insertResult, null, 2)}</pre>}
      </div>
    </div>
  );
}
