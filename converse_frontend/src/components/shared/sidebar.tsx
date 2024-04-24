import ChatHistory from "../chatHistory/chatHistory";

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-60 flex-col overflow-y-auto overflow-x-hidden border-r bg-primary dark:bg-background lg:flex p-2">
      <div className="text-lg font-bold text-white">Converse</div>
      <ChatHistory/>
    </aside>
  );
}
