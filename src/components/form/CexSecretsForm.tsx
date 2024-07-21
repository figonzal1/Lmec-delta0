import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

export type FormValues = {
  apiKey: string;
  apiSecret: string;
  password: string;
};

const CexSecretsForm = ({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [testPassed, setTestPassed] = useState(false);

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data);
    onClose();
  });


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop="blur"
      hideCloseButton={true}
    >
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Integración Bitget
          </ModalHeader>
          <ModalBody>
            <h2>¿Donde consigo estas crendenciales?</h2>

            <InputField
              register={register}
              name="apiKey"
              label="Clave API"
              error={errors.apiKey}
              errorMsg={errors.apiKey?.type === "required"}
            />

            <InputField
              register={register}
              name="apiSecret"
              label="Clave Secreta"
              error={errors.apiSecret}
              errorMsg={errors.apiSecret?.type === "required"}
            />

            <InputField
              register={register}
              name="password"
              label="Contraseña token (passphrase)"
              error={errors.password}
              errorMsg={errors.password?.type === "required"}
            />
            
            <Button
              color="success"
              variant="flat"
              isDisabled={
                !watch("apiKey") || !watch("apiSecret") || !watch("password")
              }
              onPress={() => setTestPassed(true)}
            >
              Test connection
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>
            <Button color="primary" type="submit" isDisabled={!testPassed}>
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CexSecretsForm;
