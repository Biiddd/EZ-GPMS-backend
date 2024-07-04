/*
 Navicat Premium Data Transfer

 Source Server         : gpms
 Source Server Type    : MySQL
 Source Server Version : 80400
 Source Host           : localhost:3306
 Source Schema         : gpms1

 Target Server Type    : MySQL
 Target Server Version : 80400
 File Encoding         : 65001

 Date: 04/07/2024 09:45:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `file_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_start` blob NOT NULL,
  `upload_start_time` datetime(0) NULL DEFAULT NULL,
  `file_translation` blob NOT NULL,
  `upload_translation_time` datetime(0) NULL DEFAULT NULL,
  `file_outschool` blob NULL,
  `upload_outschool_time` datetime(0) NULL DEFAULT NULL,
  `file_mid` blob NOT NULL,
  `upload_mid_time` datetime(0) NULL DEFAULT NULL,
  `result_mid` blob NOT NULL,
  `upload_midresult_time` datetime(0) NULL DEFAULT NULL,
  `file_defense` blob NOT NULL,
  `upload_defense_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`file_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `stu` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('111111111111', 0x312E747874, NULL, 0x312E706466, NULL, NULL, NULL, 0x312E657865, NULL, '', NULL, 0x312E737373, NULL);
INSERT INTO `file` VALUES ('333333333333', 0x332E747874, NULL, 0x332E706466, NULL, NULL, NULL, 0x332E657865, NULL, '', NULL, 0x332E737373, NULL);

-- ----------------------------
-- Table structure for prefile
-- ----------------------------
DROP TABLE IF EXISTS `prefile`;
CREATE TABLE `prefile`  (
  `pre_id` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `task` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `instruct` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`pre_id`) USING BTREE,
  CONSTRAINT `prefile_ibfk_1` FOREIGN KEY (`pre_id`) REFERENCES `teach_group` (`group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of prefile
-- ----------------------------
INSERT INTO `prefile` VALUES ('001', 'q', 'w');
INSERT INTO `prefile` VALUES ('002', 'a', 's');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `score_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `startScore1` float(2, 1) NULL DEFAULT -1.0 COMMENT '开题报告得分1',
  `startScore2` float(2, 1) NULL DEFAULT -1.0 COMMENT '开题报告得分2',
  `startScore3` float(2, 1) NULL DEFAULT -1.0 COMMENT '开题报告得分3',
  `startScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '开题报告得分',
  `start_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（开题打分）',
  `transScore1` float(2, 1) NULL DEFAULT -1.0 COMMENT '外文翻译得分1',
  `transScore2` float(2, 1) NULL DEFAULT -1.0 COMMENT '外文翻译得分2',
  `transScore3` float(2, 1) NULL DEFAULT -1.0 COMMENT '外文翻译得分3',
  `transScore` float(2, 1) NULL DEFAULT -1.0 COMMENT '外文翻译得分',
  `trans_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '指导老师（外文翻译）',
  `midScore1` float(2, 1) NULL DEFAULT -1.0 COMMENT '中期检查得分1',
  `midScore2` float(2, 1) NULL DEFAULT -1.0 COMMENT '中期检查得分2',
  `midScore3` float(2, 1) NULL DEFAULT -1.0 COMMENT '中期检查得分3',
  `midScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '中期检查得分',
  `midEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '中期检查评价',
  `mid_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（中期打分）',
  `teachScore1` float(2, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分1',
  `teachScore2` float(2, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分2',
  `teachScore3` float(2, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分3',
  `teachScore4` float(2, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分4',
  `teachScore5` float(2, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分5',
  `teachScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '指导老师打分',
  `teachEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '指导老师评价',
  `teach_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '指导老师（终稿）',
  `readScore1` float(2, 1) NULL DEFAULT -1.0 COMMENT '评阅老师打分1',
  `readScore2` float(2, 1) NULL DEFAULT -1.0 COMMENT '评阅老师打分2',
  `readScore3` float(2, 1) NULL DEFAULT -1.0 COMMENT '评阅老师打分3',
  `readScore4` float(2, 1) NULL DEFAULT -1.0 COMMENT '评阅老师打分4',
  `readScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '评阅老师打分',
  `readEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '评阅老师评价',
  `read_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评阅老师（终稿评阅打分）',
  `defScore1` float(3, 1) NULL DEFAULT -1.0 COMMENT '答辩得分1',
  `defScore2` float(3, 1) NULL DEFAULT -1.0 COMMENT '答辩得分2',
  `defScore3` float(3, 1) NULL DEFAULT -1.0 COMMENT '答辩得分3',
  `defScore4` float(3, 1) NULL DEFAULT -1.0 COMMENT '答辩得分4',
  `defScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '答辩得分',
  `defEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '答辩评价',
  `def_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '组长（答辩打分）',
  `finalScore` float(3, 1) NULL DEFAULT -1.0 COMMENT '总评成绩',
  `finalEva` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '总评',
  `final_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '小组秘书（最终评价）',
  PRIMARY KEY (`score_id`) USING BTREE,
  INDEX `start_id`(`start_id`) USING BTREE,
  INDEX `trans_id`(`trans_id`) USING BTREE,
  INDEX `mid_id`(`mid_id`) USING BTREE,
  INDEX `teach_id`(`teach_id`) USING BTREE,
  INDEX `read_id`(`read_id`) USING BTREE,
  INDEX `def_id`(`def_id`) USING BTREE,
  INDEX `final_id`(`final_id`) USING BTREE,
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`score_id`) REFERENCES `stu` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`start_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_3` FOREIGN KEY (`trans_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_4` FOREIGN KEY (`mid_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_5` FOREIGN KEY (`teach_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_6` FOREIGN KEY (`read_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_7` FOREIGN KEY (`def_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `score_ibfk_8` FOREIGN KEY (`final_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('111111111111', NULL, NULL, NULL, NULL, '555555555555', NULL, NULL, NULL, NULL, '222222222222', NULL, NULL, NULL, NULL, NULL, '555555555555', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '222222222222', NULL, NULL, NULL, NULL, NULL, NULL, '666666666666', NULL, NULL, NULL, NULL, NULL, NULL, '555555555555', NULL, '', '444444444444');
INSERT INTO `score` VALUES ('333333333333', NULL, NULL, NULL, NULL, '555555555555', NULL, NULL, NULL, NULL, '222222222222', NULL, NULL, NULL, NULL, NULL, '555555555555', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '222222222222', NULL, NULL, NULL, NULL, NULL, NULL, '666666666666', NULL, NULL, NULL, NULL, NULL, NULL, '555555555555', NULL, '', '444444444444');

-- ----------------------------
-- Table structure for stu
-- ----------------------------
DROP TABLE IF EXISTS `stu`;
CREATE TABLE `stu`  (
  `stu_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stu_states` int(0) NOT NULL,
  `stu_guide_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`stu_id`) USING BTREE,
  INDEX `stu_guide_id`(`stu_guide_id`) USING BTREE,
  CONSTRAINT `stu_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `stu_ibfk_2` FOREIGN KEY (`stu_guide_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stu
-- ----------------------------
INSERT INTO `stu` VALUES ('111111111111', 5, NULL);
INSERT INTO `stu` VALUES ('333333333333', 3, NULL);

-- ----------------------------
-- Table structure for stu_group
-- ----------------------------
DROP TABLE IF EXISTS `stu_group`;
CREATE TABLE `stu_group`  (
  `group_id` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  CONSTRAINT `stu_group_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `stu` (`stu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_group
-- ----------------------------
INSERT INTO `stu_group` VALUES ('001', '111111111111');
INSERT INTO `stu_group` VALUES ('002', '333333333333');

-- ----------------------------
-- Table structure for teach_group
-- ----------------------------
DROP TABLE IF EXISTS `teach_group`;
CREATE TABLE `teach_group`  (
  `group_id` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id`) USING BTREE,
  CONSTRAINT `teach_group_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teach_group
-- ----------------------------
INSERT INTO `teach_group` VALUES ('001', '222222222222');
INSERT INTO `teach_group` VALUES ('002', '444444444444');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacher_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id`) USING BTREE,
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('222222222222', '指导教师');
INSERT INTO `teacher` VALUES ('444444444444', '小组秘书');
INSERT INTO `teacher` VALUES ('555555555555', '组长');
INSERT INTO `teacher` VALUES ('666666666666', '评阅教师');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `area` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `detailAdd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('111111111111', '学生', '11', '9', '男', '11111111111', '111', '350000', '350100', '350104', '111', '2222234324234231221', '1');
INSERT INTO `user` VALUES ('222222222222', '老师', 'qw', '10', '女', '11122223333', '222', '450000', '450500', '450502', '222', '2222', '2');
INSERT INTO `user` VALUES ('333333333333', '学生', 'as', '20', '女', '22233334444', '333', '333333', '333333', '333333', '333', '3333', '3');
INSERT INTO `user` VALUES ('444444444444', '老师', 'ffe', '30', '男', '33344445555', '444', '444444', '444444', '444444', '444', '4444', '4');
INSERT INTO `user` VALUES ('555555555555', '老师', 'dc', '40', '女', '44455556666', '555', '555555', '555555', '555555', '555', '5555', '5');
INSERT INTO `user` VALUES ('666666666666', '老师', 'gr', '45', '男', '55566667777', '666', '666666', '666666', '666666', '666', '6666', '6');

SET FOREIGN_KEY_CHECKS = 1;
