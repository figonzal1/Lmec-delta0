import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { SecretVault } from "../../utils/secret_vault";

export type FormValues = {
  apiKey: string | null;
  apiSecret: string | null;
  password: string | null;
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
  const [secrets, setSecrets] = useState<FormValues>({
    apiKey: null,
    apiSecret: null,
    password: null,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted:", data);

    if (data.apiKey && data.apiSecret && data.password) {
      const vault = new SecretVault();
      await vault.init();
      
      await vault.insertRecord("bitget_apiKey", data.apiKey);
      await vault.insertRecord("bitget_apiSecret", data.apiSecret);
      await vault.insertRecord("bitget_password", data.password);
    }
    onClose();
  });

  useEffect(() => {
    const fetchSecrets = async () => {
      const vault = new SecretVault();

      await vault.init();

      const apiKey = (await vault.getRecord("bitget_apiKey")) ?? "";
      const apiSecret = (await vault.getRecord("bitget_apiSecret")) ?? "";
      const password = (await vault.getRecord("bitget_password")) ?? "";

      const values: FormValues = { apiKey, apiSecret, password };

      console.log("VAlues fetched:", values);

      setSecrets(values);
    };

    fetchSecrets();
  }, []);

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
              defaultValue={secrets.apiKey}
            />

            <InputField
              register={register}
              name="apiSecret"
              label="Clave Secreta"
              error={errors.apiSecret}
              errorMsg={errors.apiSecret?.type === "required"}
              defaultValue={secrets.apiSecret}
            />

            <InputField
              register={register}
              name="password"
              label="Contraseña token (passphrase)"
              error={errors.password}
              errorMsg={errors.password?.type === "required"}
              defaultValue={secrets.password}
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
