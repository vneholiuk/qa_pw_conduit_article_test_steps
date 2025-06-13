import { expect } from '@playwright/test';
/* eslint-disable max-len */
export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.locator('input[placeholder="Article Title"]');
    this.descriptionInput = page.locator('input[placeholder="What\'s this article about?"]');
    this.bodyTextarea = page.locator('textarea[placeholder="Write your article (in markdown)"]');
    this.tagInput = page.locator('input[placeholder="Enter tags"]');
    this.publishButton = page.locator('button', { hasText: 'Publish Article' });
    this.articleTitle = page.locator('h1');
    this.errorMessage = page.locator('.error-messages li'); // або уточни локатор
  }

  async fillTitle(title) {
    await this.titleInput.fill(title);
  }

  async fillDescription(description) {
    await this.descriptionInput.fill(description);
  }

  async fillBody(body) {
    await this.bodyTextarea.fill(body);
  }

  async fillTag(tag) {
    await this.tagInput.fill(tag);
  }

  async pressEnterAfterTag() {
    await this.tagInput.press('Enter');
  }

  async clickPublishArticleButton() {
    await this.publishButton.click();
  }

  async assertErrorMessageContainsText(expectedText) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
