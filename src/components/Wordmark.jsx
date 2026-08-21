// The gohenry wordmark, recreated in markup (coral "go" + navy/white "henry").
export default function Wordmark({ onDark = false }){
  return (
    <span className={"gh-wordmark" + (onDark ? " on-dark" : "")}>
      <span className="go">go</span><span className="henry">henry</span>
    </span>
  );
}
