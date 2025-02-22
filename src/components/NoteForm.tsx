type Props = {
  title: string;
  content: string;
};

export default function NoteForm({ title, content }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
