import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";

function ErrorBox() {
  function reload(): void {
    window.location.reload();
  }

  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Trigger></AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Boom! </AlertDialog.Title>
        <AlertDialog.Description>
          <Text>Server was blown up! </Text>
        </AlertDialog.Description>
        <Flex mt="4" justify="end">
          <Button onClick={reload} color="green" className="!text-white">
            Try Again
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default ErrorBox;
