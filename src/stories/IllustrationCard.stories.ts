import type { Meta, StoryObj } from "@storybook/react";
import IllustrationCard from "../components/IllustrationCard";

const meta = {
    title: "IllustrationCard",
    component: IllustrationCard,
} satisfies Meta<typeof IllustrationCard>;

export default meta;

type Story = StoryObj<typeof IllustrationCard>;

export const Default: Story = {
    args: {
        imageUrl: "https://picsum.photos/seed/1/300/300",
        title: "Illustration 1",
    },
};
