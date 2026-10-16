import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, type FormEvent } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from './questionnaire';

const items = [
  {
    name: 'kind',
    required: true,
    choices: [{ value: 'marketing' }, { value: 'docs' }, { value: 'portfolio' }],
  },
  {
    name: 'features',
    choices: [{ value: 'contact' }, { value: 'blog' }, { value: 'locales' }],
  },
  {
    name: 'launch',
    required: true,
    choices: [{ value: 'month' }, { value: 'quarter' }, { value: 'unsure' }],
  },
] as const;

const meta = {
  title: 'UI/Forms/Questionnaire',
  component: Questionnaire,
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Questionnaire>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectBrief() {
  const [summary, setSummary] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value : '');
    const features = data.getAll('features').map(text).join(', ') || 'none';
    setSummary(
      `Brief saved: ${text(data.get('kind'))} site, features: ${features}, launch: ${text(data.get('launch'))}.`,
    );
  }

  return (
    <div className="space-y-4">
      <Questionnaire items={items} onSubmit={handleSubmit}>
        <QuestionnaireProgress
          label="Brief progress"
          format={(current, total) => `Question ${current} of ${total}`}
        />

        <QuestionnaireItem name="kind" required>
          <QuestionnaireTitle>What are you building?</QuestionnaireTitle>
          <QuestionnaireDescription>Choose one, or describe it.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="marketing">
              <span className="font-medium">Marketing site</span>
              <QuestionnaireChoiceDescription>
                Pages that explain a product or service.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="docs">
              <span className="font-medium">Documentation</span>
              <QuestionnaireChoiceDescription>
                Guides and reference, organised by topic.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="portfolio">
              <span className="font-medium">Portfolio</span>
              <QuestionnaireChoiceDescription>
                Work, case studies and contact.
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireInput aria-label="Something else" placeholder="Something else…" />
          </QuestionnaireChoices>
          <QuestionnaireError>Choose an answer to continue.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="features" multiple>
          <QuestionnaireTitle>Which features do you need?</QuestionnaireTitle>
          <QuestionnaireDescription>Choose any that apply, or skip.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="contact">Contact form</QuestionnaireChoice>
            <QuestionnaireChoice value="blog">Blog</QuestionnaireChoice>
            <QuestionnaireChoice value="locales">Several languages</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>Choose an answer or skip this question.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="launch" required>
          <QuestionnaireTitle>When do you want to launch?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="month">Within a month</QuestionnaireChoice>
            <QuestionnaireChoice value="quarter">This quarter</QuestionnaireChoice>
            <QuestionnaireChoice value="unsure">Not sure yet</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>Choose an answer to continue.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious>Back</QuestionnairePrevious>
          <QuestionnaireSkip>Skip</QuestionnaireSkip>
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Save brief</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      <p role="status" className="text-sm text-muted-foreground">
        {summary}
      </p>
    </div>
  );
}

/**
 * One question at a time with progress, validation, skipping and going back.
 * Choices answer to arrow keys, and Enter moves on. All interface text is passed
 * in, so it can be translated.
 */
export const MultiStep: Story = {
  render: () => <ProjectBrief />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('A required question blocks Next until answered', async () => {
      await expect(canvas.getByRole('progressbar')).toHaveTextContent('Question 1 of 3');
      await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
      await expect(await canvas.findByRole('alert')).toHaveTextContent(
        'Choose an answer to continue.',
      );
    });
    await step('Answer, skip the optional question, and answer the last', async () => {
      await userEvent.click(canvas.getByRole('radio', { name: /Documentation/ }));
      await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
      await waitFor(() =>
        expect(canvas.getByRole('progressbar')).toHaveTextContent('Question 2 of 3'),
      );
      await userEvent.click(canvas.getByRole('button', { name: 'Skip' }));
      await userEvent.click(await canvas.findByRole('radio', { name: 'This quarter' }));
    });
    await step('Submitting reports the answers', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Save brief' }));
      await expect(canvas.getByRole('status')).toHaveTextContent(
        'Brief saved: docs site, features: none, launch: quarter.',
      );
    });
  },
};

function SingleQuestion() {
  return (
    <Questionnaire items={[items[1]]} onSubmit={(event) => event.preventDefault()}>
      <QuestionnaireItem name="features" multiple>
        <QuestionnaireTitle>Which features do you need?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="contact">Contact form</QuestionnaireChoice>
          <QuestionnaireChoice value="blog">Blog</QuestionnaireChoice>
          <QuestionnaireChoice value="locales">Several languages</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Save</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}

/** A single multiple-choice question, with checkboxes. */
export const SingleQuestionMultipleChoice: Story = { render: () => <SingleQuestion /> };
