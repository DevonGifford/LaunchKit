import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

const components = [
  { title: 'Forms', href: '#forms', description: 'Inputs, choices, dates and validation.' },
  {
    title: 'Feedback',
    href: '#feedback',
    description: 'Alerts, toasts, progress and empty states.',
  },
  { title: 'Overlays', href: '#overlays', description: 'Dialogs, drawers, popovers and tooltips.' },
  { title: 'Navigation', href: '#navigation', description: 'Menus, breadcrumbs and pagination.' },
];

const meta = {
  title: 'UI/Navigation/Navigation menu',
  component: NavigationMenu,
  args: { 'aria-label': 'Main' },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Site navigation with dropdown panels. Pass a translated `aria-label`: Radix
 * otherwise names the landmark "Main" in English.
 */
export const Default: Story = {
  render: (args) => (
    <div className="min-h-80">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[min(28rem,80vw)] gap-1 sm:grid-cols-2">
                {components.map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href={item.href}>
                      <span className="font-medium">{item.title}</span>
                      <span className="text-muted-foreground">{item.description}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs" className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#contact" className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Components' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(await canvas.findByRole('link', { name: /Feedback/ })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  },
};
