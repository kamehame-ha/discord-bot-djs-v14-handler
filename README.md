
<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kamehame-ha/djs-v14-handler">
    <img src="images/logo.png" alt="Logo" height="80">
  </a>

<h3 align="center">Advanced Discord.JS v 14 Handler</h3>

  <p align="center">
    Easy to use global slash command handler with ability to create/edit/delete commands on load. Also comes with command/event stuctures
    <br />
    <br />
    <a href="https://github.com/kamehame-ha/djs-v14-handler/issues">Report Bug</a>
    ·
    <a href="https://github.com/kamehame-ha/djs-v14-handler/issues">Request Feature</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/kamehame-ha/djs-v14-handler)

Here's an clean coded **global slash command handler**, i recommend this project to users with minimal uderstanding of discord.js & Node.JS. Scroll down for features/basic-setup

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Features

* **Command creating/editing/deleting** -  *Instead of using `client.application.commands.set()`*
* **Command, Event and ContextMenu structure** -  *For better understanding and intellisense*
* **Various command options**:
    * Cooldown
    * Permissions
    * Allowed Roles
    * DevOnly
    * DevGuildOnly
* **Clean console log of handler actions**
* **AutoComplete Interaction Support**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

Let's begin with basic setup of this handler

### Prerequisites

**LTS** (Long Time Support) Version of Node.js
```sh
https://nodejs.org/en/
```
*Note: I created this handler using Nodejs v18.12.1 LTS*



### Installation

1. Clone the repo or download as .zip
   ```sh
   git clone https://github.com/kamehame-ha/djs-v14-handler.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `config.json` file in main directory and fill it with needed data
   ```json
    {
        "token": "SECRET_BOT_TOKEN",
        "developerGuildId": "DEVLOPER_GUILD_ID",
        "developerId": "DEVELOPER_ID"
    }
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Usage

Example commands are located in `/commands` folder

**Typical Errors**
To avoid getting errors, make sure to not delete `command_data.json` file wich contains data needed to update commands, and for handler to work
<!-- CONTRIBUTING -->
### Contributing

Feel free to make contributions, but please add **link to this project in readme**


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
### License

This handler is free to use in non-commercial projects/apps.
See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
### Contact

**Discord** - `kameHame HA#5545`

If you are there, and you like my work don't forget to add star **Thank You!**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/cover.png
