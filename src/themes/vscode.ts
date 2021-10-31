import { Builder } from '../build';
import { Palette } from '../colour';
import { normalize } from '../filenames';

const none = '#00000000';

function theme([name, palette]: [string, Palette]): { path: string; content: string } {
	const theme = {
		name: `Tarren's themes ${name}`,
		type: 'dark',
		colors: {
			focusBorder: none,
			foreground: palette.plain,
			descriptionForeground: palette.plain,
			errorForeground: palette.error,
			'icon.foreground': palette.plain,
			'sash.hoverBorder': palette.primary3,
			'widget.shadow': none,
			'selection.background': palette.primary0 + '40',

			'window.activeBorder': palette.background0,
			'window.inactiveBorder': palette.background0,

			'textBlockQuote.background': palette.background1,
			'textCodeBlock.background': palette.background1,
			'textLink.activeForeground': palette.primary2,
			'textLink.foreground': palette.primary0,
			'textSeparator.foreground': palette.primary3,

			'button.background': palette.primary0,
			'button.secondaryBackground': palette.primary0,
			'button.hoverBackground': palette.primary1,
			'button.secondaryHoverBackground': palette.primary1,
			'button.foreground': palette.plain,
			'button.secondaryForeground': palette.plain,

			'checkbox.foreground': palette.primary2,
			'checkbox.border': palette.primary3,
			'checkbox.background': palette.background2,

			'dropdown.background': palette.background0,
			'dropdown.listBackground': palette.background0,
			'dropdown.border': palette.primary1 + '80',
			'dropdown.foreground': palette.plain,

			'input.background': palette.background0,
			'input.border': palette.primary1 + '80',
			'input.foreground': palette.plain,
			'input.placeholderForeground': palette.plain + 'cc',
			'inputOption.activeBackground': palette.background1,
			'inputOption.activeBorder': palette.primary1 + 'cc',
			'inputOption.activeForeground': palette.plain,
			'inputValidation.errorBackground': palette.background0,
			'inputValidation.errorForeground': palette.error,
			'inputValidation.errorBorder': palette.error,
			'inputValidation.infoBackground': palette.background0,
			'inputValidation.infoForeground': palette.hint,
			'inputValidation.infoBorder': palette.primary0 + '80',
			'inputValidation.warningBackground': palette.background0,
			'inputValidation.warningForeground': palette.warn,
			'inputValidation.warningBorder': palette.warn,

			'scrollbar.shadow': palette.background1 + '80',
			'scrollbarSlider.activeBackground': palette.background1,
			'scrollbarSlider.background': palette.background0,
			'scrollbarSlider.hoverBackground': palette.background1,

			'badge.foreground': palette.plain,
			'badge.background': palette.primary1,

			'progressBar.background': palette.primary1,

			'list.activeSelectionBackground': palette.background2,
			'list.activeSelectionForeground': palette.primary3,
			'list.dropBackground': palette.background2,
			'list.focusBackground': palette.background2,
			'list.focusForeground': palette.plain,
			'list.focusOutline': none,
			'list.highlightForeground': palette.plain,
			'list.hoverBackground': palette.background2,
			'list.hoverForeground': palette.plain,
			'list.inactiveSelectionBackground': palette.background1,
			'list.inactiveSelectionForeground': palette.plain,
			'list.inactiveFocusBackground': palette.background2,
			'list.inactiveFocusOutline': none,
			'list.invalidItemForeground': palette.primary0,
			'list.errorForeground': palette.error,
			'list.warningForeground': palette.warn,
			'listFilterWidget.background': palette.background0,
			'listFilterWidget.outline': palette.background0,
			'listFilterWidget.noMatchesOutline': none,
			'list.filterMatchBackground': palette.background0,
			'list.filterMatchBorder': palette.background0,
			'list.deemphasizedForeground': palette.plain + 'cc',
			'tree.indentGuidesStroke': palette.primary3,
			'tree.tableColumnsBorder': palette.primary3,

			'activityBar.activeBackground': palette.background0,
			'activityBar.background': palette.background0,
			'activityBar.inactiveForeground': palette.plain + 'cc',
			'activityBarBadge.foreground': palette.plain,
			'activityBar.foreground': palette.plain,
			'activityBarBadge.background': palette.primary1,
			'activityBar.dropBorder': palette.primary1,
			'activityBar.border': none,
			'activityBar.activeBorder': none,
			'activityBar.activeFocusBorder': none,

			'sideBar.background': palette.background0,
			'sideBar.foreground': palette.plain,
			'sideBar.border': none,
			'sideBar.dropBackground': palette.primary1,
			'sideBarTitle.foreground': palette.plain,
			'sideBarSectionHeader.background': palette.background1,
			'sideBarSectionHeader.foreground': palette.plain,
			'sideBarSectionHeader.border': none,

			'minimap.findMatchHighlight': palette.extra1,
			'minimap.selectionHighlight': palette.primary2,
			'minimap.errorHighlight': palette.error,
			'minimap.warningHighlight': palette.warn,
			'minimap.background': palette.background0 + '80',
			'minimapSlider.background': palette.background1 + '80',
			'minimapSlider.hoverBackground': palette.background1 + '80',
			'minimapSlider.activeBackground': palette.background1 + '80',
			'minimapGutter.addedBackground': palette.complementary1,
			'minimapGutter.modifiedBackground': palette.extra1,
			'minimapGutter.deletedBackground': palette.primary0,

			'editorGroup.border': none,
			'editorGroupHeader.tabsBorder': none,
			'editorGroupHeader.border': none,
			'editorGroup.focusedEmptyBorder': none,
			'tab.border': none,
			'tab.activeBorderTop': none,
			'tab.unfocusedActiveBorderTop': none,
			'tab.lastPinnedBorder': none,
			'tab.unfocusedHoverBorder': palette.primary3,
			'tab.activeModifiedBorder': palette.primary0,
			'tab.unfocusedActiveModifiedBorder': palette.primary0,
			'tab.hoverBorder': palette.primary1,
			'editorGroup.dropBackground': palette.primary1,
			'tab.activeBorder': palette.primary1,
			'tab.unfocusedActiveBorder': palette.primary2,
			'tab.inactiveModifiedBorder': palette.primary3,
			'tab.unfocusedInactiveModifiedBorder': palette.primary3,
			'editorGroupHeader.noTabsBackground': palette.background0,
			'editorGroupHeader.tabsBackground': palette.background0,
			'editorGroup.emptyBackground': palette.background0,
			'tab.activeBackground': palette.background0,
			'tab.unfocusedActiveBackground': palette.background0,
			'tab.inactiveBackground': palette.background0,
			'tab.unfocusedInactiveBackground': palette.background0,
			'editorPane.background': palette.background0,
			'tab.hoverBackground': palette.background1,
			'tab.unfocusedHoverBackground': palette.background1,
			'tab.activeForeground': palette.plain,
			'tab.hoverForeground': palette.plain,
			'tab.unfocusedHoverForeground': palette.plain,
			'tab.inactiveForeground': palette.plain + '80',
			'tab.unfocusedActiveForeground': palette.plain + '80',
			'tab.unfocusedInactiveForeground': palette.plain + '80',

			'editor.background': palette.background0,
			'editor.foreground': palette.plain,
			'editorLineNumber.foreground': palette.primary3 + '80',
			'editorLineNumber.activeForeground': palette.primary3 + 'cc',
			'editorCursor.background': palette.primary1,
			'editorCursor.foreground': palette.primary1,

			'editor.selectionBackground': palette.primary0 + '40',
			'editor.selectionForeground': palette.extra1,
			'editor.inactiveSelectionBackground': palette.primary3 + '40',
			'editor.selectionHighlightBackground': palette.primary1 + '40',
			'editor.selectionHighlightBorder': none,

			'editor.wordHighlightBackground': palette.primary1 + '80',
			'editor.wordHighlightBorder': none,
			'editor.wordHighlightStrongBackground': palette.primary1 + '80',
			'editor.wordHighlightStrongBorder': none,

			'editor.findMatchBackground': palette.primary3 + '80',
			'editor.findMatchHighlightBackground': palette.primary2 + '80',
			'editor.findRangeHighlightBackground': palette.extra2 + '40',
			'editor.findMatchBorder': none,
			'editor.findMatchHighlightBorder': none,
			'editor.findRangeHighlightBorder': none,

			'searchEditor.findMatchBackground': palette.background0,
			'searchEditor.findMatchBorder': none,
			'searchEditor.textInputBorder': palette.primary0 + '80',

			'editor.hoverHighlightBackground': palette.background0,

			'editor.lineHighlightBackground': none,
			'editor.lineHighlightBorder': palette.primary0 + '40',

			'editorLink.activeForeground': palette.extra2,

			'editor.rangeHighlightBackground': palette.primary0 + '40',
			'editor.rangeHighlightBorder': none,

			'editor.symbolHighlightBackground': palette.background0,
			'editor.symbolHighlightBorder': none,

			'editorWhitespace.foreground': palette.primary3 + '80',
			'editorIndentGuide.background': palette.primary3 + '40',
			'editorIndentGuide.activeBackground': palette.primary3 + '80',

			'editorRuler.foreground': palette.primary0 + '80',
			'editor.linkedEditingBackground': palette.background0,
			'editorCodeLens.foreground': palette.primary3 + '80',
			'editorLightBulb.foreground': palette.primary3 + '80',
			'editorLightBulbAutoFix.foreground': palette.primary3 + '80',

			'editorBracketMatch.background': palette.primary0 + '80',
			'editorBracketMatch.border': none,

			'editor.foldBackground': palette.background2 + '80',

			'editorOverviewRuler.border': none,

			'editorError.foreground': palette.error,
			'editorError.border': none,
			'editorError.background': none,
			'editorWarning.foreground': palette.warn,
			'editorWarning.border': none,
			'editorWarning.background': none,
			'editorInfo.foreground': palette.hint,
			'editorInfo.border': none,
			'editorInfo.background': none,
			'editorHint.foreground': palette.hint,
			'editorHint.border': none,
			'problemsErrorIcon.foreground': palette.error,
			'problemsWarningIcon.foreground': palette.warn,
			'problemsInfoIcon.foreground': palette.hint,

			'editorUnnecessaryCode.border': none,
			'editorUnnecessaryCode.opacity': '#00000080',

			'editorGutter.background': palette.background0,
			'editorGutter.modifiedBackground': palette.extra0 + '80',
			'editorGutter.addedBackground': palette.complementary0 + '80',
			'editorGutter.deletedBackground': palette.primary0 + '80',
			'editorGutter.commentRangeForeground': palette.background2,
			'editorGutter.foldingControlForeground': palette.primary3 + 'cc',

			'diffEditor.insertedTextBackground': palette.complementary1 + '40',
			'diffEditor.insertedTextBorder': none,
			'diffEditor.removedTextBackground': palette.primary0 + '40',
			'diffEditor.removedTextBorder': none,
			'diffEditor.border': none,
			'diffEditor.diagonalFill': palette.background2,

			'editorWidget.foreground': palette.plain,
			'editorWidget.background': palette.background0,
			'editorWidget.border': palette.background2,
			'editorWidget.resizeBorder': palette.background2,
			'editorSuggestWidget.background': palette.background0,
			'editorSuggestWidget.border': none,
			'editorSuggestWidget.foreground': palette.plain,
			'editorSuggestWidget.highlightForeground': palette.primary3,
			'editorSuggestWidget.selectedBackground': palette.background2,
			'editorHoverWidget.foreground': palette.plain,
			'editorHoverWidget.background': palette.background0,
			'editorHoverWidget.border': palette.primary0 + '80',
			'editorHoverWidget.statusBarBackground': palette.background1,

			'debugExceptionWidget.background': palette.background2,
			'debugExceptionWidget.border': none,

			'editorMarkerNavigation.background': palette.background0,
			'editorMarkerNavigationError.background': palette.error,
			'editorMarkerNavigationWarning.background': palette.warn,
			'editorMarkerNavigationInfo.background': palette.hint,

			'peekView.border': none,
			'peekViewEditor.background': palette.background1,
			'peekViewEditorGutter.background': palette.background2,
			'peekViewEditor.matchHighlightBackground': palette.primary0 + '40',
			'peekViewEditor.matchHighlightBorder': none,
			'peekViewResult.background': palette.background2,
			'peekViewResult.fileForeground': palette.plain,
			'peekViewResult.matchHighlightBackground': palette.primary0 + '40',
			'peekViewResult.selectionBackground': palette.primary1 + '40',
			'peekViewResult.selectionForeground': palette.plain,
			'peekViewTitle.background': palette.background2,
			'peekViewTitleDescription.foreground': palette.plain,
			'peekViewTitleLabel.foreground': palette.plain,

			'merge.currentHeaderBackground': palette.complementary1 + '80',
			'merge.currentContentBackground': palette.complementary1 + '40',
			'merge.incomingHeaderBackground': palette.extra1 + '80',
			'merge.incomingContentBackground': palette.extra1 + '40',
			'merge.border': none,
			'merge.commonContentBackground': none,
			'merge.commonHeaderBackground': none,
			'editorOverviewRuler.currentContentForeground': palette.complementary1 + 'cc',
			'editorOverviewRuler.incomingContentForeground': palette.extra1 + 'cc',
			'editorOverviewRuler.commonContentForeground': palette.primary2 + '80',

			'panel.background': palette.background0,
			'panel.border': none,
			'panel.dropBorder': palette.primary1,
			'panelTitle.activeBorder': palette.primary1,
			'panelTitle.activeForeground': palette.primary3,
			'panelTitle.inactiveForeground': palette.plain,
			'panelInput.border': none,
			'panelSection.border': none,
			'panelSection.dropBackground': palette.extra0,
			'panelSectionHeader.background': palette.background0,
			'panelSectionHeader.foreground': palette.plain,
			'panelSectionHeader.border': none,

			'imagePreview.border': palette.background2,

			'statusBar.background': palette.background0,
			'statusBar.foreground': palette.plain + 'cc',
			'statusBar.border': none,
			'statusBar.debuggingBackground': palette.background1,
			'statusBar.debuggingForeground': palette.plain,
			'statusBar.debuggingBorder': none,
			'statusBar.noFolderForeground': palette.background1,
			'statusBar.noFolderBackground': palette.plain + 'cc',
			'statusBar.noFolderBorder': none,
			'statusBarItem.activeBackground': palette.background1,
			'statusBarItem.hoverBackground': palette.background2,
			'statusBarItem.prominentForeground': palette.plain,
			'statusBarItem.prominentBackground': palette.background2,
			'statusBarItem.prominentHoverBackground': palette.background2,
			'statusBarItem.remoteBackground': palette.extra0 + '80',
			'statusBarItem.remoteForeground': palette.plain,
			'statusBarItem.errorBackground': palette.error + '80',
			'statusBarItem.errorForeground': palette.plain,

			'titleBar.activeBackground': palette.background0,
			'titleBar.activeForeground': palette.plain,
			'titleBar.inactiveBackground': palette.background0,
			'titleBar.inactiveForeground': palette.plain + '80',
			'titleBar.border': none,

			'menubar.selectionForeground': palette.plain,
			'menubar.selectionBackground': palette.background1,
			'menubar.selectionBorder': none,
			'menu.foreground': palette.plain + 'cc',
			'menu.background': palette.background0,
			'menu.selectionForeground': palette.plain,
			'menu.selectionBackground': palette.background1,
			'menu.selectionBorder': none,
			'menu.separatorBackground': palette.background0,
			'menu.border': none,

			'notificationCenter.border': none,
			'notificationCenterHeader.foreground': palette.plain,
			'notificationCenterHeader.background': palette.background2,
			'notificationToast.border': none,
			'notifications.foreground': palette.plain,
			'notifications.background': palette.background1,
			'notifications.border': none,
			'notificationLink.foreground': palette.primary1,
			'notificationsErrorIcon.foreground': palette.error,
			'notificationsWarningIcon.foreground': palette.warn,
			'notificationsInfoIcon.foreground': palette.hint,

			'extensionButton.prominentForeground': palette.plain,
			'extensionButton.prominentBackground': palette.primary0,
			'extensionButton.prominentHoverBackground': palette.primary2,
			'extensionBadge.remoteBackground': palette.extra0,
			'extensionBadge.remoteForeground': palette.plain,
			'extensionIcon.starForeground': palette.primary3,

			'pickerGroup.border': none,
			'pickerGroup.foreground': palette.background2,
			'quickInput.background': palette.background0,
			'quickInput.foreground': palette.plain,
			'quickInputList.focusBackground': palette.background2,
			'quickInputTitle.background': palette.background1,

			'settings.headerForeground': palette.plain,
			'settings.modifiedItemIndicator': palette.primary0,
			'settings.dropdownBackground': palette.background0,
			'settings.dropdownForeground': palette.plain,
			'settings.dropdownBorder': none,
			'settings.dropdownListBorder': none,
			'settings.checkboxBackground': palette.background0,
			'settings.checkboxForeground': palette.primary2,
			'settings.checkboxBorder': palette.primary2,
			'settings.textInputBackground': palette.background0,
			'settings.textInputForeground': palette.plain,
			'settings.textInputBorder': palette.primary0 + '80',
			'settings.numberInputBackground': palette.background0,
			'settings.numberInputForeground': palette.plain,
			'settings.numberInputBorder': none,
			'settings.focusedRowBackground': palette.background1,
			'notebook.focusedRowBorder': palette.primary0,
			'notebook.rowHoverBackground': palette.background1,

			'breadcrumb.foreground': palette.plain,
			'breadcrumb.background': palette.background0,
			'breadcrumb.focusForeground': palette.plain,
			'breadcrumb.activeSelectionForeground': palette.primary3,
			'breadcrumbPicker.background': palette.background0,

			'symbolIcon.arrayForeground': palette.extra1,
			'symbolIcon.booleanForeground': palette.extra1,
			'symbolIcon.classForeground': palette.extra1,
			'symbolIcon.colorForeground': palette.extra1,
			'symbolIcon.constantForeground': palette.primary2,
			'symbolIcon.constructorForeground': palette.primary2,
			'symbolIcon.enumeratorForeground': palette.primary1,
			'symbolIcon.enumeratorMemberForeground': palette.plain,
			'symbolIcon.eventForeground': palette.extra1,
			'symbolIcon.fieldForeground': palette.extra1,
			'symbolIcon.fileForeground': palette.primary3,
			'symbolIcon.folderForeground': palette.primary2,
			'symbolIcon.functionForeground': palette.primary1,
			'symbolIcon.interfaceForeground': palette.extra1,
			'symbolIcon.keyForeground': palette.extra0,
			'symbolIcon.keywordForeground': palette.extra2,
			'symbolIcon.methodForeground': palette.primary1,
			'symbolIcon.moduleForeground': palette.extra2,
			'symbolIcon.namespaceForeground': palette.extra2,
			'symbolIcon.nullForeground': palette.extra0,
			'symbolIcon.numberForeground': palette.extra1,
			'symbolIcon.objectForeground': palette.extra0,
			'symbolIcon.operatorForeground': palette.primary3,
			'symbolIcon.packageForeground': palette.primary0,
			'symbolIcon.propertyForeground': palette.plain,
			'symbolIcon.referenceForeground': palette.primary3,
			'symbolIcon.snippetForeground': palette.plain,
			'symbolIcon.stringForeground': palette.complementary0,
			'symbolIcon.structForeground': palette.extra1,
			'symbolIcon.textForeground': palette.plain,
			'symbolIcon.typeParameterForeground': palette.plain,
			'symbolIcon.unitForeground': palette.extra0,
			'symbolIcon.variableForeground': palette.primary2,
		},
		tokenColors: [
			{
				name: 'Comment',
				scope: ['comment', 'punctuation.definition.comment'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.plain + '80',
				},
			},
			{
				name: 'Variables',
				scope: ['variable', 'string constant.other.placeholder'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Colors',
				scope: ['constant.other.color'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Invalid',
				scope: ['invalid', 'invalid.illegal'],
				settings: {
					foreground: '#FF4040',
				},
			},
			{
				name: 'Keyword, Storage',
				scope: ['keyword', 'storage.type', 'storage.modifier'],
				settings: {
					foreground: palette.primary1,
				},
			},
			{
				name: 'Operator, Misc',
				scope: ['keyword.control', 'constant.other.color'],
				settings: {
					foreground: palette.extra2,
				},
			},
			{
				name: 'Punctuation',
				scope: [
					'punctuation',
					'meta.tag',
					'punctuation.definition.tag',
					'punctuation.separator.inheritance.php',
					'punctuation.definition.tag.html',
					'punctuation.definition.tag.begin.html',
					'punctuation.definition.tag.end.html',
					'punctuation.section.embedded',
					'keyword.other.template',
					'keyword.other.substitution',
				],
				settings: {
					foreground: palette.complementary0,
				},
			},
			{
				name: 'Tag',
				scope: ['entity.name.tag', 'meta.tag.sgml', 'markup.deleted.git_gutter'],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Function, Special Method',
				scope: [
					'entity.name.function',
					'meta.function-call',
					'variable.function',
					'support.function',
					'keyword.other.special-method',
				],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Block Level Variables',
				scope: ['meta.block variable.other'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Other Variable, String Link',
				scope: ['support.other.variable', 'string.other.link'],
				settings: {
					foreground: palette.primary2,
				},
			},
			{
				name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
				scope: [
					'constant.numeric',
					'constant.language',
					'support.constant',
					'constant.character',
					'constant.escape',
					'variable.parameter',
					'keyword.other.unit',
					'keyword.other',
				],
				settings: {
					foreground: palette.extra0,
				},
			},
			{
				name: 'String, Symbols, Markup Heading',
				scope: [
					'string',
					'constant.other.symbol',
					'constant.other.key',
					'markup.heading',
					'markup.inserted.git_gutter',
					'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
				],
				settings: {
					foreground: palette.complementary1,
				},
			},
			{
				name: 'Class, Inherited Class, Support',
				scope: [
					'entity.name',
					'support.type',
					'support.class',
					'support.orther.namespace.use.php',
					'meta.use.php',
					'support.other.namespace.php',
					'markup.changed.git_gutter',
					'support.type.sys-types',
					'entity.other.inherited-class',
				],
				settings: {
					foreground: palette.extra1,
				},
			},
			{
				name: 'Entity Types',
				scope: ['support.type'],
				settings: {
					foreground: palette.extra1,
				},
			},
			{
				name: 'CSS Class and Support',
				scope: [
					'source.css support.type.property-name',
					'source.sass support.type.property-name',
					'source.scss support.type.property-name',
					'source.less support.type.property-name',
					'source.stylus support.type.property-name',
					'source.postcss support.type.property-name',
				],
				settings: {
					foreground: palette.complementary1,
				},
			},
			{
				name: 'Sub-methods',
				scope: ['entity.name.module.js', 'variable.import.parameter.js', 'variable.other.class.js'],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Language methods',
				scope: ['variable.language'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.extra2,
				},
			},
			{
				name: 'entity.name.method.js',
				scope: ['entity.name.method.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0,
				},
			},
			{
				name: 'meta.method.js',
				scope: ['meta.class-method.js entity.name.function.js', 'variable.function.constructor'],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Attributes',
				scope: ['entity.other.attribute-name'],
				settings: {
					foreground: palette.extra1,
				},
			},
			{
				name: 'HTML Attributes',
				scope: ['text.html.basic entity.other.attribute-name.html', 'text.html.basic entity.other.attribute-name'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.extra1,
				},
			},
			{
				name: 'CSS Classes',
				scope: ['entity.other.attribute-name.class'],
				settings: {
					foreground: palette.extra1,
				},
			},
			{
				name: "CSS ID's",
				scope: ['source.sass keyword.control'],
				settings: {
					foreground: palette.extra0,
				},
			},
			{
				name: 'Inserted',
				scope: ['markup.inserted'],
				settings: {
					foreground: palette.complementary0,
				},
			},
			{
				name: 'Deleted',
				scope: ['markup.deleted'],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Changed',
				scope: ['markup.changed'],
				settings: {
					foreground: palette.extra0,
				},
			},
			{
				name: 'Regular Expressions',
				scope: ['string.regexp'],
				settings: {
					foreground: palette.extra2,
				},
			},
			{
				name: 'Escape Characters',
				scope: ['constant.character.escape'],
				settings: {
					foreground: palette.complementary1,
				},
			},
			{
				name: 'URL',
				scope: ['*url*', '*link*', '*uri*'],
				settings: {
					foreground: palette.complementary1,
					fontStyle: 'underline',
				},
			},
			{
				name: 'Decorators',
				scope: ['tag.decorator.js entity.name.tag.js', 'tag.decorator.js punctuation.definition.tag.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0,
				},
			},
			{
				name: 'ES7 Bind Operator',
				scope: ['source.js constant.other.object.key.js string.unquoted.label.js'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary2,
				},
			},
			{
				name: 'JSON Key - Level 0',
				scope: ['source.json meta.structure.dictionary.json support.type.property-name.json'],
				settings: {
					foreground: palette.primary1,
				},
			},
			{
				name: 'JSON Key - Level 1',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary0,
				},
			},
			{
				name: 'JSON Key - Level 2',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra0,
				},
			},
			{
				name: 'JSON Key - Level 3',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.primary2,
				},
			},
			{
				name: 'JSON Key - Level 4',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary1,
				},
			},
			{
				name: 'JSON Key - Level 5',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra2,
				},
			},
			{
				name: 'JSON Key - Level 6',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.primary2,
				},
			},
			{
				name: 'JSON Key - Level 7',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.extra0,
				},
			},
			{
				name: 'JSON Key - Level 8',
				scope: [
					'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
				],
				settings: {
					foreground: palette.complementary0,
				},
			},
			{
				name: 'Markdown - Plain',
				scope: ['text.html.markdown', 'punctuation.definition.list_item.markdown'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Markdown - Markup Raw Inline',
				scope: ['text.html.markdown markup.inline.raw.markdown'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Markdown - Markup Raw Inline Punctuation',
				scope: ['text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown'],
				settings: {
					foreground: palette.primary2,
				},
			},
			{
				name: 'Markdown - Heading',
				scope: [
					'markdown.heading',
					'markup.heading | markup.heading entity.name',
					'markup.heading.markdown punctuation.definition.heading.markdown',
				],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markup - Italic',
				scope: ['markup.italic'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markup - Bold',
				scope: ['markup.bold', 'markup.bold string'],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markup - Bold-Italic',
				scope: [
					'markup.bold markup.italic',
					'markup.italic markup.bold',
					'markup.quote markup.bold',
					'markup.bold markup.italic string',
					'markup.italic markup.bold string',
					'markup.quote markup.bold string',
				],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markup - Underline',
				scope: ['markup.underline'],
				settings: {
					fontStyle: 'underline',
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markdown - Blockquote',
				scope: ['markup.quote punctuation.definition.blockquote.markdown'],
				settings: {
					foreground: palette.primary2,
				},
			},
			{
				name: 'Markup - Quote',
				scope: ['markup.quote'],
				settings: {
					fontStyle: 'italic',
					foreground: palette.primary2,
				},
			},
			{
				name: 'Markdown - Link',
				scope: ['string.other.link.title.markdown'],
				settings: {
					foreground: palette.primary1,
				},
			},
			{
				name: 'Markdown - Link Description',
				scope: ['string.other.link.description.title.markdown'],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Markdown - Link Anchor',
				scope: ['constant.other.reference.link.markdown'],
				settings: {
					foreground: palette.primary0,
				},
			},
			{
				name: 'Markup - Raw Block',
				scope: ['markup.raw.block'],
				settings: {
					foreground: palette.primary1,
				},
			},
			{
				name: 'Markdown - Raw Block Fenced',
				scope: ['markup.raw.block.fenced.markdown'],
				settings: {
					foreground: '#00000050',
				},
			},
			{
				name: 'Markdown - Fenced Bode Block',
				scope: ['punctuation.definition.fenced.markdown'],
				settings: {
					foreground: '#00000050',
				},
			},
			{
				name: 'Markdown - Fenced Bode Block Variable',
				scope: [
					'markup.raw.block.fenced.markdown',
					'variable.language.fenced.markdown',
					'punctuation.section.class.end',
				],
				settings: {
					foreground: palette.plain,
				},
			},
			{
				name: 'Markdown - Fenced Language',
				scope: ['variable.language.fenced.markdown'],
				settings: {
					foreground: palette.primary1,
				},
			},
			{
				name: 'Markdown - Separator',
				scope: ['meta.separator'],
				settings: {
					fontStyle: 'bold',
					foreground: palette.primary2,
				},
			},
			{
				name: 'Markup - Table',
				scope: ['markup.table'],
				settings: {
					foreground: palette.primary2,
				},
			},
		],
	};

	return { path: `dist/${normalize(name)}.json`, content: JSON.stringify(theme, undefined, '\t') };
}

const generate: Builder = (
	palettes,
	{ name, displayName, description, version, author, publisher, license, repository }
) => {
	const pkg = {
		name,
		displayName,
		description,
		version,
		author,
		publisher,
		license,
		repository,
		engines: {
			vscode: '^1.29.0',
		},
		categories: ['Themes'],
		contributes: {
			themes: palettes.reduce(
				(acc, [name]) => [
					...acc,
					{
						label: `Tarren's themes ${name}`,
						uiTheme: 'vs-dark',
						path: `./dist/${normalize(name)}.json`,
					},
				],
				[] as { label: string; uiTheme: string; path: string }[]
			),
		},
	};

	return [...palettes.map(theme), { path: 'package.json', content: JSON.stringify(pkg, undefined, '\t') }];
};

export = generate;
