import Table from "@/app/components/Admin/ContactTable";
import Title from "@/app/admin/Title";

export default function ContactPage() {
  return (
    <>
      <Title type="문의 목록" />
      <Table type="contact" />
    </>
  );
}
