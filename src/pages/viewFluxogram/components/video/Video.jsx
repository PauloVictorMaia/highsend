function Video({ data }) {
  return (
      <iframe
          width="210"
          height="150"
          src={data.value.replace("youtube.com/watch?v=", "youtube.com/embed/")}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
      ></iframe>
  );
}

export default Video;
