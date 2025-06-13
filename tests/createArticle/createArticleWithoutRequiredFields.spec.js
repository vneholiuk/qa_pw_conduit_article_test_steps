import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await test.step('Open Sign Up page', async () => {
    await signUpPage.open();
  });

  await test.step('Fill Sign Up form', async () => {
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
  });

  await test.step('Submit Sign Up form', async () => {
    await signUpPage.clickSignUpButton();
  });

  await test.step('Verify user is logged in', async () => {
    await homePage.assertYourFeedTabIsVisible();
  });
});

test('Create an article with all fields filled', async () => {
  const title = 'Test article';
  const description = 'This is a short description';
  const body = 'This is the full article body';
  const tag = 'testTag';

  await test.step('Open New Article page', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill all article fields', async () => {
    await createArticlePage.fillTitle(title);
    await createArticlePage.fillDescription(description);
    await createArticlePage.fillBody(body);
    await createArticlePage.fillTag(tag);
    await createArticlePage.pressEnterAfterTag();
  });

  await test.step('Publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Check article was published', async () => {
    await expect(createArticlePage.articleTitle).toHaveText(title);
  });
});

test('Create an article without description', async () => {
  const title = 'Article without description';
  const body = 'Body is here';
  const tag = 'taggy';

  await test.step('Open New Article page', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title, body, tag', async () => {
    await createArticlePage.fillTitle(title);
    await createArticlePage.fillBody(body);
    await createArticlePage.fillTag(tag);
    await createArticlePage.pressEnterAfterTag();
  });

  await test.step('Try to publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Assert description error message is shown', async () => {
    await createArticlePage.assertErrorMessageContainsText(
      'Article description cannot be empty'
    );
  });
});

test('Create an article without body', async () => {
  const title = 'Article without body';
  const description = 'Nice intro';
  const tag = 'nobody';

  await test.step('Open New Article page', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title, description, tag', async () => {
    await createArticlePage.fillTitle(title);
    await createArticlePage.fillDescription(description);
    await createArticlePage.fillTag(tag);
    await createArticlePage.pressEnterAfterTag();
  });

  await test.step('Try to publish article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Assert body error message is shown', async () => {
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty'
    );
  });
});

test('Create an article without tag', async () => {
  const title = 'Article without tag';
  const description = 'Short';
  const body = 'Some body content here.';

  await test.step('Open New Article page', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Fill article title, description, body', async () => {
    await createArticlePage.fillTitle(title);
    await createArticlePage.fillDescription(description);
    await createArticlePage.fillBody(body);
  });

  await test.step('Publish article without tag', async () => {
    await createArticlePage.clickPublishArticleButton();
  });

  await test.step('Check article was published', async () => {
    await expect(createArticlePage.articleTitle).toHaveText(title);
  });
});
