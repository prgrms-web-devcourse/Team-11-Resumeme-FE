import { Meta } from '@storybook/react';
import { EventGrid } from '.';
import { DUMMY_DATA } from './dummy';

const meta = {
  title: 'Resumeme/Components/EventGrid',
  tags: ['autodocs'],
  component: EventGrid,
} satisfies Meta<typeof EventGrid>;

export default meta;

export const Default = () => {
  return <EventGrid events={DUMMY_DATA} />;
};