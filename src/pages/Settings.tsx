import { Switch, Tab, Tabs } from "@nextui-org/react";
import { useEffect } from "react";
import useDarkMode from "use-dark-mode";

const Settings = () => {
  const darkMode = useDarkMode(true);

  useEffect(() => {
    console.log("DarkMode ", darkMode);
  }, [darkMode]);

  return (
    <div className="p-12 dark:bg-gray-500 min-h-screen">
      <h1 className="text-4xl dark:text-white">Settings</h1>

      <Tabs className="py-5" variant="underlined" color="primary">
        <Tab key="appareance" title="Apariencia">
          <h2>Appareance</h2>
        </Tab>

        <Tab key="profile" title="Perfil">
          <div className="bg-green-400 flex">
            <div className="flex flex-col gap-1 bg-blue-400">
              <p className="text-xl">Enable early access</p>
              <p className="text-sm text-default-400">
                Get access to new features before they are released.
              </p>
            </div>
            <Switch
              className="mx-auto"
              isSelected={darkMode.value}
              onValueChange={() => {
                darkMode.toggle();
              }}
            ></Switch>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settings;
