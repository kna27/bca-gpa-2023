# BCA GPA 2023

An update version of [the BCA GPA browser extension](https://github.com/alebod21/bcagpa) that fixes bugs due to PowerSchool updates, and also adds a port to Firefox.

If any new issues arise due to a PowerSchool update or oversight, please open an issue or pull request.

Chrome Web Store Page: https://chrome.google.com/webstore/detail/bca-gpa/ofhfmclagjfikdfhjnogmcokilbikmpf

Firefox Addon Page: https://addons.mozilla.org/en-US/firefox/addon/bca-gpa/

![Screenshot of extension](https://github.com/kna27/bca-gpa-2023/assets/68395794/6eac9b8a-a034-4583-8a0d-e7b72efcb508)

## Using BCA GPA on Safari

BCA GPA is not available as an extension for Safari yet, but here is a method of achieving the same functionality as on Chrome or Firefox:

-   Install the [Userscripts](https://apps.apple.com/ua/app/userscripts/id1463298887) extension for Safari through the Mac App Store.
    -   We will use this to run BCA GPA on Powerschool.
    -   This extension works exactly like Greasyfork or Tampermonkey and lets you run your own scripts on websites.
-   Add the Userscripts extension to the toolbar, click on the icon and go to "Open Extension Page".
    ![](https://github.com/timrolsh/bca-gpa-2023/assets/68395794/ee236710-ea38-4b87-9cc3-cbbf5af688c2)
-   You should then be brought to a page like this:
    ![](https://github.com/timrolsh/bca-gpa-2023/assets/68395794/40dec63e-aa66-4ab7-ba43-0705d390e034)
-   Use the menu to add a new Javascript script.
    ![](https://github.com/timrolsh/bca-gpa-2023/assets/68395794/e6baf820-f7a3-4d1f-98cb-708f62e1a769)
-   Copy and paste everything from [this link](https://raw.githubusercontent.com/kna27/bca-gpa-2023/main/SAFARI/BCAGPA.js) and replace everything in the textbox with what you copied.
-   It should look like this:
    ![](https://github.com/timrolsh/bca-gpa-2023/assets/68395794/f142c4dd-8de0-4aa3-a0e8-b0733c4f5801)
-   Make sure to hit "Save" at the bottom right of the screen to apply the changes in the userscript settings.
-   Reload or visit the Powerschool page and you should see your GPA there. It should look like this:
    ![](https://github.com/kna27/bca-gpa-2023/assets/68395794/6eac9b8a-a034-4583-8a0d-e7b72efcb508)
-   If you don't see it, make sure that the Userscript is activated in the menu, it should look like this:
    ![](https://github.com/timrolsh/bca-gpa-2023/assets/68395794/c00b5f10-24a0-4e52-9c4b-2800e568973a)
