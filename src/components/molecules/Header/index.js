import {
	Box,
	Flex,
	Avatar,
	HStack,
	Button,
	Menu,
	MenuButton,
	InputGroup,
	InputRightElement,
	Input,
	Heading,
} from "@chakra-ui/react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { SettingOutlined, BellOutlined } from "@ant-design/icons";

import { logo as logoSty, user as userSty, userMobile as userMobileSty, searchBar as searchBarSty } from "./styles";

const Header = () => {
	return (
		<>
			<Box bg="white" px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Flex alignItems={"center"} position="relative">
						<Box css={logoSty} />
						<Flex
							h={16}
							alignItems={"center"}
							justifyContent={"space-between"}
							marginLeft={-8}
						>
							<Box css={userSty}>
								<Menu>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
										marginRight={4}
									>
										<Avatar
											size={"sm"}
										/>
									</MenuButton>
								</Menu>
							</Box>
							<Box css={userSty}>
								<Heading as="h5" size="sm">
									Reinhart H.
								</Heading>
								<Heading
									as="h6"
									size="xs"
									color="#9C9C9C"
									fontSize="10px"
								>
									Kemang Jakarta
								</Heading>
							</Box>
							<Box marginLeft={4} css={userSty}>
								<ChevronDownIcon size="4px" />
							</Box>
						</Flex>
					</Flex>
					<Flex alignItems={"center"} css={searchBarSty}>
						<Box>
							<InputGroup>
								<Input
									placeholder="Search Text"
									borderColor="#DDDDD"
								/>
								<InputRightElement
									children={<SearchIcon color="#33333" />}
								/>
							</InputGroup>
						</Box>
						<Box marginLeft={4}>
							<BellOutlined
								width={22}
								height={22}
								style={{ fontSize: "22px" }}
							/>
						</Box>
						<Box marginLeft={4}>
							<SettingOutlined
								width={22}
								height={22}
								style={{ fontSize: "22px" }}
							/>
						</Box>
						<Box css={userMobileSty}>
							<Menu>
								<MenuButton
									as={Button}
									rounded={"full"}
									variant={"link"}
									cursor={"pointer"}
									minW={0}
									marginRight={4}
								>
									<Avatar
										size={"sm"}
										src={
											"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
										}
									/>
								</MenuButton>
							</Menu>
						</Box>
					</Flex>
				</Flex>
			</Box>
		</>
	);
};

export default Header;
