import { Modal, Spin, Descriptions, Image, Button, Space } from "antd";
import { useUserDetails } from "../../hooks/useUserDetails";

const UserCard = ({ isShow = false, userId, onClick }) => {
  const { user, loading, error } = useUserDetails({ id: userId });

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""} ${user.maidenName || ""}`
    : "";

  if (error) {
    return (
      <Modal
        title="Ошибка"
        open={isShow}
        onCancel={onClick}
        footer={[
          <Button key="close" onClick={onClick} type="primary">
            Закрыть
          </Button>,
        ]}
      >
        <div style={{ color: "red" }}>Ошибка загрузки: {error}</div>
      </Modal>
    );
  }

  return (
    <Modal
      title={`Информация о пользователе${fullName ? ` - ${fullName}` : ""}`}
      open={isShow}
      onCancel={onClick}
      footer={[
        <Button key="close" onClick={onClick} type="primary">
          Закрыть
        </Button>,
      ]}
      width={600}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin
            size="large"
            description="Загрузка данных..."
            orientation="vertical"
          />
        </div>
      ) : (
        user && (
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            {user.image && (
              <div style={{ textAlign: "center" }}>
                <Image
                  src={user.image}
                  alt={fullName}
                  width={100}
                  height={100}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  preview={false}
                />
              </div>
            )}

            <Descriptions bordered column={1}>
              <Descriptions.Item label="ФИО">
                {fullName || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label="Возраст">
                {user.age || "Не указано"} лет
              </Descriptions.Item>
              <Descriptions.Item label="Телефон">
                {user.phone || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {user.email || "Не указано"}
              </Descriptions.Item>
              <Descriptions.Item label="Адрес">
                {user.address?.address || ""},{user.address?.city || ""},
                {user.address?.country || ""}
              </Descriptions.Item>
              <Descriptions.Item label="Рост">
                {user.height || "Не указано"} см
              </Descriptions.Item>
              <Descriptions.Item label="Вес">
                {user.weight || "Не указано"} кг
              </Descriptions.Item>
            </Descriptions>
          </Space>
        )
      )}
    </Modal>
  );
};

export default UserCard;
