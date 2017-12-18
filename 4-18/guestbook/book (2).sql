/*
Navicat MySQL Data Transfer

Source Server         : 本地_mysql
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : book_d0801

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2016-12-08 12:13:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `contents`
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `dateline` int(10) unsigned DEFAULT '0',
  `support` int(11) unsigned DEFAULT '0',
  `oppose` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`cid`),
  KEY `oppose` (`oppose`),
  KEY `uid` (`uid`),
  KEY `support` (`support`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(16) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `avatar` tinyint(1) unsigned DEFAULT '1',
  `login_key` varchar(32) DEFAULT NULL,
  `login_time` int(11) DEFAULT NULL COMMENT '最近登录时间',
  PRIMARY KEY (`uid`),
  KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
