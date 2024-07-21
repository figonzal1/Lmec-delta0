import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbEye, TbEyeClosed } from "react-icons/tb";

type FormValues = {
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

  const [visibilityStates, setVisibilityStates] = useState([
    false,
    false,
    false,
  ]);

  const [testPassed, setTestPassed] = useState(false);

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data);
    onClose();
  });

  const toggleVisibility = (index: number) => {
    setVisibilityStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

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
            <Input
              {...register("apiKey", { required: true })}
              type={visibilityStates[0] ? "text" : "password"}
              label="Clave API"
              radius="lg"
              isRequired
              isInvalid={errors.apiKey ? true : false}
              errorMessage={
                errors.apiKey?.type === "required"
                  ? "Este campo es requerido"
                  : ""
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => toggleVisibility(0)}
                  aria-label="toggle password visibility"
                >
                  {visibilityStates[0] ? (
                    <TbEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <TbEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              {...register("apiSecret", { required: true })}
              type={visibilityStates[1] ? "text" : "password"}
              label="Clave Secreta"
              radius="lg"
              isRequired
              isInvalid={errors.apiSecret ? true : false}
              errorMessage={
                errors.apiSecret?.type === "required"
                  ? "Este campo es requerido"
                  : ""
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => toggleVisibility(1)}
                  aria-label="toggle password visibility"
                >
                  {visibilityStates[1] ? (
                    <TbEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <TbEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />

            <Input
              {...register("password", { required: true })}
              type={visibilityStates[2] ? "text" : "password"}
              label="Contraseña token (passphrase)"
              radius="lg"
              isRequired
              isInvalid={errors.password ? true : false}
              errorMessage={
                errors.password?.type === "required"
                  ? "Este campo es requerido"
                  : ""
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => toggleVisibility(2)}
                  aria-label="toggle password visibility"
                >
                  {visibilityStates[2] ? (
                    <TbEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <TbEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
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
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
              isDisabled={!testPassed}
            >
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
