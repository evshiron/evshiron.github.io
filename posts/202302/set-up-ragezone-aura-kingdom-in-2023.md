---
title: Set up RaGEZONE Aura Kingdom in 2023
---

# Set up RaGEZONE Aura Kingdom in 2023

Recently I become nostalgic and look into Aura Kingdom stuff, after searching about it for a while, it seems quite easy to set up a local version for some quick experience.

Although there are missing caveats, I manage to do it and want to write down the steps for future use.

Hope it helps you too.

## Table of contents

## Download prerequisite files

[[Aura Kingdom] Release Files V7 - Content 110](https://forum.ragezone.com/f937/aura-kingdom-release-files-v7-1191652/)

* Server Files
* Backup Database
* T Files
* Client Files

## Download and install VirtualBox

## Create Debian 9 (stretch) VirtualBox VM

## Update VM network to Bridged

## Run one click installer in VM

[[OpenSource] One click server](https://forum.ragezone.com/f936/opensource-one-click-server-1169800/)

Run the following commands as `root`:

```shell
wget "https://raw.githubusercontent.com/haruka98/ak_oneclick_installer/master/akinstall.sh"
chmod +x akinstall.sh
./akinstall.sh
```

Follow the prompts and choose the recommended ones. Save the final log somewhere for future use.

## Fix server data

Run the following commands as `root`:

```shell
# backup old data?
mv /root/hxsy/Data /root/hxsy/Data.old

# use data from hxsy-2020-10-21.rar
cp -r hxsy-2020-10-21.rar/hxsy/Data /root/hxsy/Data

# use data from T_Files.rar
cp -r T_Files.rar/* /root/hxsy/Data/db

# dirty and simple
chmod 0777 -R /root/hxsy
```

## Create user account

`vi pg_hba.conf`, replace `peer` in the line of `postgres` with `md5`, and `systemctl restart postgresql` before proceeding.

```shell
# setting PGPASSWORD environment variable before executing psql
# which is the postgres password in the final log above
# or you can find it in /root/hxsy/setup.ini
export PGPASSWORD=
```

```sql
; psql -U postgres -d ffaccount
INSERT INTO accounts (id, username, password) VALUES ('1', 'test', 'test');

; psql -U postgres -d ffdb1
INSERT INTO tb_user (mid, password, pwd) VALUES ('test', 'test', '098f6bcd4621d373cade4e832627b4f6');
```

`pwd` is the MD5 hash of `password`. Note that the server stores passwords in plaintext.

## Start server

```shell
/root/hxsy/start

# stop server
# /root/hxsy/stop
```

## Start client

Modified `connect.ini` and `connects.ini`, replace IP addresses to yours, while ports remain unchanged.

Double click the client launcher, enter username and password created above, and you are done.

## GM commands

Run the following SQL to enable GM commands for a character.

```sql
; ffdb1
UPDATE player_characters SET privilege = 5 WHERE ...;
```

## Fix Item Mall

Take `itemmall` table data from `ffaccount.bak` of backup database and import it.

```shell
psql -U postgres -d ffaccount -f itemmall.sql
```

## Fix Fortune Bag

Take `fortune_bag` table data from `ffaccount.bak` of backup database and import it.

```shell
psql -U postgres -d ffaccount -f fortune_bag.sql
```

## Fix Dress Room

Take `dressroom` table data from `ffaccount.bak` of backup database and import it.

```shell
psql -U postgres -d ffaccount -f dressroom.sql
```

## Links

* [[Aura Kingdom] Released Files](https://forum.ragezone.com/f937/aura-kingdom-released-files-1204666/)
* [haruka98@Gist](https://gist.github.com/haruka98)
* [haruka98@GitHub](https://github.com/haruka98?tab=repositories)

## Q & A

Q: Why should I use a VM?

> The server data is old enough that might crash if the date is not around 2013 to 2016, so the system time has to be adjusted to avoid unknown problems, which is not suitable for a real machine.

Q: Why should I use Debian 9?

> It's said to work with Debian 11, but I keep getting Segmentation Fault so I choose Debian 9 instead.

Q: Why should I use Bridged network?

> Bridged network can be easily accessed from local network for file transfer.

Q: Why should I run the installer as root?

> First of all, the system time needs to be adjusted. Don't bother with best practice when you are running a VM with wrong time and old binaries, where passwords are stored in plaintext.
