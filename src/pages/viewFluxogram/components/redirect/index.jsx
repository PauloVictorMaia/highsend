import { useEffect } from "react";

function Redirect({ data }) {
  useEffect(() => {
    let url = data.value;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    window.location.href = url;
  }, [data.value]);

  return <div></div>;
}

export default Redirect;
