import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { ActionFunction} from "@remix-run/router";
import { json } from "@remix-run/router";

export const action: ActionFunction = () => {
  return json({ status: "success" });
};

export default function Index() {
  const ref = useRef<HTMLFormElement>(null);
  const [submitCounter, setSubmitCounter] = useState(0); // We use the counter to trigger the useEffect
  const fetcher = useFetcher();

  const success = fetcher.data?.status === "success";

  // Console message so we can verify it works
  console.log('success', success, 'submitCounter', submitCounter)

  useEffect(() => {
    const formData = new FormData();
    formData.set("message", `${submitCounter}`)

    fetcher.submit(formData, { method: "post", action: "/?index" });
  }, [fetcher, success, submitCounter]) // Remove "fetcher" here from dependencies and it works as intended

  const handleSubmit = () => {
    setSubmitCounter(prev => prev + 1)
  }

  return (
    <fetcher.Form ref={ref} className="flex flex-col p-10" onSubmit={(e) => e.preventDefault()}>
      <h4>Nice to meet you. Let's chat!</h4>
      <textarea name="message" className="border border-slate-300"/>
      <button type="button" className="underlined pt-1" onClick={handleSubmit}>Send</button>
    </fetcher.Form>
  );
}
