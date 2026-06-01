export default function LessonText({ title, paragraphs }) {
  return (
    <section className="lesson__block">
      {title ? <h2 className="lesson__block-title">{title}</h2> : null}
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="lesson__text">
          {paragraph}
        </p>
      ))}
    </section>
  )
}
